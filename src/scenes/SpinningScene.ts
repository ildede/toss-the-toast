import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {SPEED_EFFECT} from '~/const/Assets'
import {MAIN_SCENE} from '~/scenes/MainScene'
import Toast from '~/objects/Toast'
import SpinningToast from '~/objects/SpinningToast'

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {
    private spinningToast!: SpinningToast

    constructor() {
        super({ key: SPINNING_SCENE })
    }

    create(toast: Toast) {
        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, SPEED_EFFECT)
            .setScale(3.5, 2.5)

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

        this.input.once('pointerdown', () => {
            toast.anims.msPerFrame = this.spinningToast.anims.msPerFrame
            toast.anims.currentFrame = this.spinningToast.anims.currentFrame
            this.scene.resume(MAIN_SCENE, toast)
            this.scene.stop()
        }, this)

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'j') {
                this.spinningToast.anims.msPerFrame -= 10
            }
            if (event.key === 'h') {
                this.spinningToast.anims.msPerFrame += 10
            }
        })
    }

}
