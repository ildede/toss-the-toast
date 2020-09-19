import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {ARROW, BACKGROUND} from '~/const/Assets'
import Toast from '~/objects/Toast'

export const MAIN_SCENE = 'MainScene'
export default class MainScene extends Phaser.Scene {

    readonly START_X: number = DEFAULT_WIDTH * 0.15
    readonly START_Y: number = DEFAULT_HEIGHT * 0.6

    private startingPoint!: Phaser.GameObjects.Image
    private toast!: Toast

    constructor() {
        super({ key: MAIN_SCENE })
    }

    create() {
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT)

        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(2,2)
        this.startingPoint = this.add.image(this.START_X, this.START_Y, ARROW)
            .setScale(0.4, 0.4)
        this.toast = new Toast(this).setVisible(false)
    }

    update(time: number, delta: number) {

        this.input.on('pointermove', (pointer) => {
            const angle = Phaser.Math.Angle.Between(this.START_X, this.START_Y, pointer.x, pointer.y)
            this.startingPoint.setRotation(angle)
        }, this)

        this.input.on('pointerdown', (pointer) => {

            if (!this.toast.visible || (this.toast.body?.velocity.y == 0 && this.toast.body?.velocity.x == 0)) {

                this.startingPoint.setVisible(false)
                this.toast.destroy()
                this.toast = new Toast(this)

                const cam = this.cameras.main
                cam.pan(this.START_X, this.START_Y, 1000)

                const cursorX = pointer.x
                const cursorY = pointer.y
                cam.zoomTo(4, 1500, 'Sine.easeInOut', true,
                    (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                        if (progress == 1) {
                            camera.startFollow(this.toast)
                            this.toast.toss(cursorX, cursorY)
                        }
                    }, this)

            }
        }, this)

        if (this.toast?.body?.velocity.y == 0 && !this.startingPoint.visible) {
            this.toast.land()
            const cam = this.cameras.main
            cam.stopFollow()
            cam.zoomTo(1)
            this.startingPoint.setVisible(true)
        }

        super.update(time, delta)
    }
}
