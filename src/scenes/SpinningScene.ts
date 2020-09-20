import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {MAIN_SCENE} from '~/scenes/MainScene'
import Toast from '~/objects/Toast'
import SpinningToast from '~/objects/SpinningToast'
import SpeedBackground from '~/objects/SpeedBackground'
import {COLA, SPIN_BGM, STRAW} from '~/const/Assets'
import {BGM_VOLUME, SPEED_EFFECT_TIME} from "~/const/Config";

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {
    private spinningToast!: SpinningToast
    private music!: Phaser.Sound.BaseSound;
    private score = 0;
    private scoreText!: Phaser.GameObjects.Text;

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

        const infoText = this.make.text({
            x: DEFAULT_WIDTH/2,
            y: DEFAULT_HEIGHT*0.85,
            style: {
                font: '50px monospace',
                fill: '#ffffff'
            }
        })
        infoText.setText('H = -\nJ = +')
        infoText.setOrigin(0.5, 0.5)

        this.scoreText = this.make.text({
            x: DEFAULT_WIDTH*0.95,
            y: DEFAULT_HEIGHT*0.1,
            style: {
                font: '50px monospace',
                fill: '#ffffff'
            }
        })
        this.scoreText.setText(`${this.score}`)
        this.scoreText.setOrigin(0.5, 0.5)

        setTimeout(() => {
            toast.anims.msPerFrame = this.spinningToast.anims.msPerFrame
            toast.anims.currentFrame = this.spinningToast.anims.currentFrame
            this.music.stop()
            this.scene.resume(MAIN_SCENE, { score: this.score, toast: toast })
            this.scene.stop()
        }, SPEED_EFFECT_TIME)

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'j') {
                if (this.spinningToast.anims.msPerFrame > 30) {
                    this.spinningToast.anims.msPerFrame -= 5
                }
            }
            if (event.key === 'h') {
                this.spinningToast.anims.msPerFrame += 5
            }
        })
    }

    update(time: number, delta: number) {
        this.scoreText.setText(`${this.score}`)
        super.update(time, delta);
    }

    incrementCounter: () => void = () => this.score += 1
}
