import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {
    ARROW,
    BACKGROUND,
    FAIL_1,
    FAIL_2,
    IDLE_BGM,
    LOST_SFX,
    SLIP_SFX,
    SPLAT,
    SPLAT_SFX,
    WIN_1,
    WIN_2,
    WIN_3,
    WIN_SFX,
    WTF
} from '~/const/Assets'
import Toast from '~/objects/Toast'
import {SPINNING_SCENE} from '~/scenes/SpinningScene'
import Plate from '~/objects/Plate'
import BarCounter from '~/objects/BarCounter'
import Floor from '~/objects/Floor'
import Wall from '~/objects/Wall'
import UnlockedNewToast from "~/objects/UnlockedNewToast";
import {SPLASH_SCENE} from "~/scenes/SplashScene";
import {BGM_VOLUME, TIME_TO_ENTER_SPEED_EFFECT} from "~/const/Config";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export const MAIN_SCENE = 'MainScene'
export default class MainScene extends Phaser.Scene {

    readonly START_X: number = DEFAULT_WIDTH * 0.20
    readonly START_Y: number = DEFAULT_HEIGHT * 0.55
    readonly WINNING_BOBBLES: string[] = [WIN_1, WIN_2, WIN_3]
    readonly FAIL_BOBBLES: string[] = [FAIL_1, FAIL_2]
    readonly WTF_BOBBLES: string[] = [WTF]
    readonly SPLAT_BOBBLES: string[] = [SPLAT]

    private gameState = -1
    private startingPoint!: Phaser.GameObjects.Image
    private bobble!: Phaser.GameObjects.Image
    private toast!: Toast
    private plate!: Plate
    private staticGroup!: Phaser.Physics.Arcade.StaticGroup
    private music!: Phaser.Sound.BaseSound;
    private timer!: number;
    private toastUnlocked = 1;

    constructor() {
        super({ key: MAIN_SCENE })
    }

    create(data: { texture: string, anim: string, toastCount: number }) {
        this.toastUnlocked = data.toastCount
        if (this.gameState === 1) this.gameState = -1

        this.cameras.main.fadeIn(100)
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT)
        this.music = this.sound.add(IDLE_BGM, {
            volume: BGM_VOLUME,
            loop: true
        })
        this.music.play()

        this.add.image(DEFAULT_WIDTH*0.57, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(7,7)
        this.startingPoint = this.add.image(this.START_X, this.START_Y, ARROW)
            .setScale(0.4, 0.4)

        this.plate = new Plate(this)
        this.staticGroup = this.physics.add.staticGroup([
            new BarCounter(this),
            new Floor(this),
            new Wall(this)
        ])

        this.toast = new Toast(this, data).setVisible(false)

        this.events.on('resume', (system, data: Toast) => {
            this.toast = data
            this.music['mute'] = false
        })

        this.input.on('pointermove', (pointer) => {
            const angle = Phaser.Math.Angle.Between(this.START_X, this.START_Y, pointer.x, pointer.y)
            this.startingPoint.setRotation(angle)
        }, this)

        this.input.on('pointerdown', (pointer) => {
            if (this.gameState != 1) {
                this.gameState = 0
                this.startingPoint.setVisible(false)
                this.bobble?.destroy()
                this.toast.destroy()
                this.toast = new Toast(this, data)

                const cam = this.cameras.main
                cam.pan(this.START_X, this.START_Y, 400, 'Sine.easeInOut')

                const cursorX = pointer.x
                const cursorY = pointer.y
                cam.zoomTo(5, 500, 'Sine.easeInOut', true,
                    (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                        if (progress == 1) {
                            camera.startFollow(this.toast)
                            this.toast.toss(cursorX, cursorY)
                            this.sound.play(SLIP_SFX)
                            this.timer = setTimeout(() => {
                                this.music['mute'] = true
                                this.scene.pause()
                                this.scene.launch(SPINNING_SCENE, this.toast)
                            }, TIME_TO_ENTER_SPEED_EFFECT)
                        }
                    }, this)

            }
        }, this)
    }

    update(time: number, delta: number) {

        this.physics.overlap(this.plate, this.toast, () => {
            if (this.gameState === 0) {
                const win = this.toast.anims.currentFrame.index === 8
                    || this.toast.anims.currentFrame.index === 1
                    || this.toast.anims.currentFrame.index === 2
                const wtf = this.toast.anims.currentFrame.index === 3
                    || this.toast.anims.currentFrame.index === 7
                // const win = false
                // const wtf = true
                this.toast.land()
                // const win = this.toast.anims.currentFrame.index === 8 //BEFORE 100
                // const win = this.toast.anims.currentFrame.index === 1 //100
                // const win = this.toast.anims.currentFrame.index === 2 //AFTER 100

                // const win = this.toast.anims.currentFrame.index === 3 //WTF RIGHT

                // const win = this.toast.anims.currentFrame.index === 4 //BEFORE SPLAT
                // const win = this.toast.anims.currentFrame.index === 5 //SUPER SPLAT
                // const win = this.toast.anims.currentFrame.index === 6 //AFTER SPLAT

                // const win = this.toast.anims.currentFrame.index === 7 //WTF LEFT
                if (win) {
                    this.sound.play(WIN_SFX)
                    this.gameState = 1
                    this.bobble = this.add.image(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, this.getWinBobble())
                        .setScale(5, 5)
                    this.time.addEvent({
                        delay: 4000,
                        callback:() => {
                            this.bobble?.destroy()
                            const unlocked = new UnlockedNewToast(this, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2).setInteractive({ useHandCursor: true })
                            unlocked.on('pointerdown', () => {
                                this.scene.stop()
                                this.scene.start(SPLASH_SCENE, { toastCount: this.toastUnlocked+1 })
                            })
                        }
                    })

                } else {
                    this.sound.play(LOST_SFX)
                    this.gameState = 2

                    if (wtf) {
                        this.bobble = this.add.image(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, this.getWtfBobble())
                            .setScale(5, 5)
                    } else {
                        this.bobble = this.add.image(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, this.getFailBobble())
                            .setScale(5, 5)
                    }
                    this.time.addEvent({
                        delay: 4000,
                        callback:() => this.bobble?.destroy()
                    })
                }
            }
        })
        this.physics.world.collide(this.toast, this.staticGroup, (a: GameObjectWithBody) => {
            if (this.gameState === 0) {
                (a as Toast).splat()
                clearTimeout(this.timer)
                this.sound.play(SPLAT_SFX)
                this.gameState = 3

                this.bobble = this.add.image((a as Toast).x, DEFAULT_HEIGHT * 0.5, this.getSplatBobble())
                        .setScale(5, 5)
                this.time.addEvent({
                    delay: 4000,
                    callback:() => this.bobble?.destroy()
                })
            }
        })
        if (this.gameState > 0) {
            const cam = this.cameras.main
            cam.stopFollow()
            cam.zoomTo(1)

            if (this.gameState != 1) {
                this.startingPoint.setVisible(true)
            }
        }

        super.update(time, delta)
    }

    getWinBobble: () => string = () => {
        return this.WINNING_BOBBLES[Math.floor(Math.random() * this.WINNING_BOBBLES.length)]
    }
    getFailBobble: () => string = () => {
        return this.FAIL_BOBBLES[Math.floor(Math.random() * this.FAIL_BOBBLES.length)]
    }
    getWtfBobble: () => string = () => {
        return this.WTF_BOBBLES[Math.floor(Math.random() * this.WTF_BOBBLES.length)]
    }
    getSplatBobble: () => string = () => {
        return this.SPLAT_BOBBLES[Math.floor(Math.random() * this.SPLAT_BOBBLES.length)]
    }
}
