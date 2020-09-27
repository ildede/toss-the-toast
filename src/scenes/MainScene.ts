import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {
    BACKGROUND,
    CAT_SFX,
    FAIL_1,
    FAIL_1_POPUP,
    FAIL_2,
    FAIL_2_POPUP,
    GLASS_SFX,
    IDLE_BGM,
    LOST_SFX,
    PLATE,
    SLIP_SFX,
    WIN_1,
    WIN_1_POPUP,
    WIN_2,
    WIN_2_POPUP,
    WIN_3,
    WIN_3_POPUP,
    WIN_SFX,
    WTF_1,
    WTF_1_POPUP
} from '~/const/Assets'
import Toast from '~/objects/Toast'
import {SPINNING_SCENE} from '~/scenes/SpinningScene'
import Plate from '~/objects/Plate'
import UnlockedNewToast from "~/objects/UnlockedNewToast";
import {SPLASH_SCENE} from "~/scenes/SplashScene";
import {BGM_VOLUME, TIME_TO_ENTER_SPEED_EFFECT} from "~/const/Config";
import AngleGauge from "~/objects/AngleGouge";
import TossLimit from "~/objects/TossLimit";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export const MAIN_SCENE = 'MainScene'
export default class MainScene extends Phaser.Scene {

    readonly START_X: number = DEFAULT_WIDTH * 0.15
    readonly START_Y: number = DEFAULT_HEIGHT * 0.55
    readonly WINNING_BOBBLES: { a: string; t: string }[] = [{t:WIN_1,a:WIN_1_POPUP}, {t:WIN_2,a:WIN_2_POPUP}, {t:WIN_3,a:WIN_3_POPUP}]
    readonly FAIL_BOBBLES: { a: string; t: string }[] = [{t:FAIL_1,a:FAIL_1_POPUP}, {t:FAIL_2,a:FAIL_2_POPUP}]
    readonly WTF_BOBBLES: { a: string; t: string }[] = [{t:WTF_1,a:WTF_1_POPUP}]

    private gameState = -1
    private startingPoint!: Phaser.GameObjects.Image
    private bobble!: Phaser.GameObjects.Image
    private toast!: Toast
    private plate!: Plate
    private staticGroup!: Phaser.Physics.Arcade.StaticGroup
    private music!: Phaser.Sound.BaseSound;
    private timer!: number;
    private toastUnlocked = 1;
    private unitScoreValue!: Phaser.GameObjects.Image;
    private tensScoreValue!: Phaser.GameObjects.Image;
    private cameraFilter: any;

    constructor() {
        super({ key: MAIN_SCENE })
    }

    create(data: { texture: string, anim: string, toastCount: number, unlimitedSpinning: boolean }) {
        this.toastUnlocked = data.toastCount
        if (this.gameState === 1) this.gameState = -1

        this.cameras.main.fadeIn(100)
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT)
        if (!this.music) {
            this.music = this.sound.add(IDLE_BGM, {
                volume: BGM_VOLUME,
                loop: true
            })
            this.music.play()
        } else {
            if (!this.music.isPlaying) {
                this.music.play()
            }
        }

        this.add.image(DEFAULT_WIDTH*0.57, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(7,7)
        this.startingPoint = new AngleGauge(this, this.START_X, this.START_Y)

        this.plate = new Plate(this)
        this.staticGroup = this.physics.add.staticGroup([
            new TossLimit(this, DEFAULT_WIDTH*0.74, DEFAULT_HEIGHT*0.78, PLATE, 200, 300),
            new TossLimit(this, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.87, PLATE, DEFAULT_WIDTH*1.5, 50),
            new TossLimit(this, DEFAULT_WIDTH*0.08, DEFAULT_HEIGHT*0.5, PLATE, 50, DEFAULT_HEIGHT*2),
            new TossLimit(this, DEFAULT_WIDTH * 1.055, DEFAULT_HEIGHT * 0.5, PLATE, 50, DEFAULT_HEIGHT * 2, false, [CAT_SFX, GLASS_SFX])
        ])

        this.toast = new Toast(this, data).setVisible(false)

        this.events.on('resume', (system, data: {toast: Toast, score: number}) => {
            this.toast = data.toast
            this.music['mute'] = false
            if (data.score) {
                this.unitScoreValue?.destroy()
                this.tensScoreValue?.destroy()
                this.unitScoreValue = this.add.image(DEFAULT_WIDTH*0.95, DEFAULT_HEIGHT*0.1, `number${Math.floor(data.score%10)}`)
                    .setScale(0.5, 0.5)
                this.tensScoreValue = this.add.image(DEFAULT_WIDTH*0.92, DEFAULT_HEIGHT*0.1, `number${Math.floor((data.score/10)%10)}`)
                    .setScale(0.5, 0.5)
            }
        })

        this.input.on('pointermove', (pointer) => {
            const angle = Phaser.Math.Angle.Between(this.START_X, this.START_Y, pointer.x, pointer.y)
            if (angle > -1.47 && angle < 0) {
                this.startingPoint.setRotation(angle)
            }
        }, this)

        this.input.on('pointerdown', () => {
            if (this.gameState != 1) {
                this.gameState = 0
                this.startingPoint.setVisible(false)
                this.bobble?.destroy()
                this.toast.destroy()
                this.toast = new Toast(this, data)

                const cam = this.cameras.main
                cam.pan(this.START_X, this.START_Y, 400, 'Sine.easeInOut')

                cam.zoomTo(5, 500, 'Sine.easeInOut', true,
                    (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                        if (progress == 1) {
                            camera.startFollow(this.toast)
                            this.toast.toss(this.startingPoint)
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

        if (this.cameraFilter) {
            this.cameraFilter.angle -= 1
            this.cameraFilter.radius += 8
        }
        if (this.gameState === 1 && this.toast.unlimitedSpinning) {
            this.toast.anims.msPerFrame -= 0.6
        }
        this.physics.overlap(this.plate, this.toast, () => {
            if (this.gameState === 0) {
                const win = this.toast.anims.currentFrame.index === 8
                    || this.toast.anims.currentFrame.index === 1
                    || this.toast.anims.currentFrame.index === 2
                const wtf = this.toast.anims.currentFrame.index === 3
                    || this.toast.anims.currentFrame.index === 7
                this.toast.land()
                if (this.toast.unlimitedSpinning) {
                    this.sound.play(WIN_SFX)
                    this.gameState = 1
                    this.time.addEvent({
                        delay: 2000,
                        callback:() => {
                            if (!this.cameraFilter) {
                                this.cameraFilter = this.plugins.get('rexswirlpipelineplugin')['add'](this, 'Swirl');
                            } else {
                                this.cameraFilter.angle = 0
                                this.cameraFilter.radius = 0
                            }
                            this.cameras.main.setRenderToTexture(this.cameraFilter);
                            this.cameraFilter.setCenter(this.toast.x, this.toast.y)
                            setTimeout(() => {
                                this.cameras.main.fadeOut(500)
                                setTimeout(() => this.scene.start(SPLASH_SCENE, { toastCount: 1 }), 1000)
                            }, 2000)

                        }
                    })

                } else if (win) {
                    this.sound.play(WIN_SFX)
                    this.gameState = 1
                    this.bobble = this.getWinBobble()
                    this.time.addEvent({
                        delay: 2000,
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
                        this.bobble = this.getWtfBobble()
                    } else {
                        this.bobble = this.getFailBobble()
                    }
                    this.time.addEvent({
                        delay: 2000,
                        callback:() => this.bobble?.destroy()
                    })
                }
            }
        })
        this.physics.world.collide(this.toast, this.staticGroup, (toast: GameObjectWithBody, limit: GameObjectWithBody) => {
            if (this.gameState === 0) {
                (toast as Toast).splat()
                clearTimeout(this.timer);

                const tossLimit = limit as TossLimit;
                this.sound.play(tossLimit.getSFX())
                this.gameState = 3

                if ((toast as Toast).unlimitedSpinning) {
                    this.bobble = this.getWtfBobble()
                } else {
                    this.bobble = tossLimit.getSplatBobble(Math.min((toast as Toast).x, DEFAULT_WIDTH*0.85), DEFAULT_HEIGHT * 0.5)
                }
                this.time.addEvent({
                    delay: 2000,
                    callback:() => this.bobble?.destroy()
                })
            }
        })
        if (this.gameState > 0) {
            const cam = this.cameras.main
            cam.stopFollow()
            cam.zoomTo(1, 150)

            if (this.gameState != 1) {
                this.startingPoint.setVisible(true)
            }
        }

        super.update(time, delta)
    }

    getWinBobble: () => Phaser.GameObjects.Sprite = () => {
        const bobble = this.WINNING_BOBBLES[Math.floor(Math.random() * this.WINNING_BOBBLES.length)]
        return this.add.sprite(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, bobble.t)
            .play(bobble.a)
    }
    getFailBobble: () => Phaser.GameObjects.Sprite = () => {
        const bobble = this.FAIL_BOBBLES[Math.floor(Math.random() * this.FAIL_BOBBLES.length)]
        return this.add.sprite(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, bobble.t)
            .play(bobble.a)
    }
    getWtfBobble: () => Phaser.GameObjects.Sprite = () => {
        const bobble = this.WTF_BOBBLES[0]
        return this.add.sprite(DEFAULT_WIDTH * 0.8, DEFAULT_HEIGHT * 0.4, bobble.t)
            .play(bobble.a)
    }
}
