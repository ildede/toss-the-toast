import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {MAIN_SCENE} from '~/scenes/MainScene'
import Toast from '~/objects/Toast'
import SpinningToast from '~/objects/SpinningToast'
import SpeedBackground from '~/objects/SpeedBackground'
import {COLA, MINUS, PLUS, SPIN_BGM, STRAW} from '~/const/Assets'
import {BGM_VOLUME, SPEED_EFFECT_TIME} from "~/const/Config";

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {
    private spinningToast!: SpinningToast
    private music!: Phaser.Sound.BaseSound;
    private score = 0;
    private unitValue!: Phaser.GameObjects.Image;
    private tensValue!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: SPINNING_SCENE })
    }

    create(toast: Toast) {
        this.score = 0
        this.music = this.sound.add(SPIN_BGM, {
            volume: BGM_VOLUME,
            loop: true
        })
        this.music.play()

        new SpeedBackground(this)
        const straw = this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.1, STRAW)
        const cola = this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.1, COLA)
        this.tweens.add({
            targets: cola,
            displayWidth: { start: 0, to: straw.width*1.5-30 },
            x: { start: DEFAULT_WIDTH*0.148, to: DEFAULT_WIDTH*0.5 },
            ease: 'Linear',
            duration: SPEED_EFFECT_TIME
        })

        this.spinningToast = new SpinningToast(this, toast)

        const plus = this.add.image(DEFAULT_WIDTH*0.6, DEFAULT_HEIGHT*0.85, PLUS)
            .setInteractive({ useHandCursor: true })
        const minus = this.add.image(DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.85, MINUS)
            .setInteractive({ useHandCursor: true })
        plus.on('pointerdown', () => {
            if (this.spinningToast.anims.msPerFrame > 30) {
                this.spinningToast.anims.msPerFrame -= 5
            }
        })
        minus.on('pointerdown', () => {
            this.spinningToast.anims.msPerFrame += 5
        })


        this.unitValue = this.add.image(DEFAULT_WIDTH*0.95, DEFAULT_HEIGHT*0.1, 'number0')
            .setScale(0.5, 0.5)
        this.tensValue = this.add.image(DEFAULT_WIDTH*0.92, DEFAULT_HEIGHT*0.1, 'number0')
            .setScale(0.5, 0.5)

        setTimeout(() => {
            toast.anims.msPerFrame = this.spinningToast.anims.msPerFrame
            toast.anims.currentFrame = this.spinningToast.anims.currentFrame
            this.music.stop()
            this.scene.resume(MAIN_SCENE, { score: this.score, toast: toast })
            this.scene.stop()
        }, SPEED_EFFECT_TIME)

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === '+' || event.key === 'j') {
                if (this.spinningToast.anims.msPerFrame > 30) {
                    this.spinningToast.anims.msPerFrame -= 5
                }
            }
            if (event.key === '-' || event.key === 'h') {
                this.spinningToast.anims.msPerFrame += 5
            }
        })
    }

    update(time: number, delta: number) {
        this.unitValue.setTexture(`number${Math.floor(this.score%10)}`)
        if (this.score > 9) {
            this.tensValue.setTexture(`number${Math.floor((this.score/10)%10)}`)
        }
        super.update(time, delta);
    }

    incrementCounter: () => void = () => this.score += 1
}
