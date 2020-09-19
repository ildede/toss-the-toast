import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {ARROW, BACKGROUND, TOAST} from "~/const/Assets";

export const MAIN_SCENE = 'MainScene'
export default class MainScene extends Phaser.Scene {

    private readonly START_X: number = DEFAULT_WIDTH * 0.15;
    private readonly START_Y: number = DEFAULT_HEIGHT * 0.6;

    private startingPoint!: Phaser.GameObjects.Image;
    private toast!: Phaser.Physics.Arcade.Image;

    constructor() {
        super({ key: MAIN_SCENE })
    }

    create() {
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(2,2)
        this.startingPoint = this.add.image(this.START_X, this.START_Y, ARROW)
            .setScale(0.4, 0.4)
    }

    update(time: number, delta: number) {

        this.input.on('pointermove', (pointer) => {
            const cursor = pointer;
            const angle = Phaser.Math.Angle.Between(this.START_X, this.START_Y, cursor.x, cursor.y)
            this.startingPoint.setRotation(angle)
        }, this);

        this.input.on('pointerdown', (pointer) => {

            if (!this.toast || (this.toast.body?.velocity.y == 0 && this.toast.body?.velocity.x == 0)) {
                if (this.toast) {
                    this.toast.destroy()
                }

                this.startingPoint.destroy()
                this.startingPoint = this.add.image(this.START_X, this.START_Y, TOAST)
                    .setScale(0.4, 0.4)

                const cam = this.cameras.main;
                cam.pan(this.START_X, this.START_Y, 1000)

                const cursorX = pointer.x;
                const cursorY = pointer.y;
                cam.zoomTo(1, 1500, 'Sine.easeInOut', true, (camera, progress, x, y) => {
                    if (progress == 1) {
                        this.toast = this.physics.add.image(this.START_X, this.START_Y, TOAST).setScale(0.4, 0.4)
                        this.toast.setCollideWorldBounds(true, 0, 0)
                        this.startingPoint.destroy()
                        camera.startFollow(this.toast)
                        this.physics.moveTo(this.toast, cursorX, cursorY, 1000);
                        this.toast.setAngularVelocity(300)
                    }
                }, this)

            }
        }, this);

        if (this.toast?.body?.velocity.y == 0) {
            this.toast.setAngularVelocity(0)
            const cam = this.cameras.main;
            cam.stopFollow()
            cam.zoomTo(1)
        }

        super.update(time, delta);
    }
}
