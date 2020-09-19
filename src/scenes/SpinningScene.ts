import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {MAIN_SCENE} from '~/scenes/MainScene'
import Toast from '~/objects/Toast'
import SpinningToast from '~/objects/SpinningToast'
import SpeedBackground from '~/objects/SpeedBackground'

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {
    private spinningToast!: SpinningToast

    constructor() {
        super({ key: SPINNING_SCENE })
    }

    create(toast: Toast) {
        new SpeedBackground(this)
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
                if (this.spinningToast.anims.msPerFrame > 30) {
                    this.spinningToast.anims.msPerFrame -= 5
                }
            }
            if (event.key === 'h') {
                this.spinningToast.anims.msPerFrame += 5
            }
        })
    }

}
