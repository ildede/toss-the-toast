import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {SPEED_EFFECT, TOAST} from '~/const/Assets'
import {MAIN_SCENE} from "~/scenes/MainScene";
import Toast from "~/objects/Toast";

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {

    constructor() {
        super({ key: SPINNING_SCENE })
    }

    create(toast: Toast) {
        console.log('RUN with ', toast)
        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, SPEED_EFFECT)
            .setScale(3.5, 2.5)

        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, TOAST)
            .setScale(toast.scaleX*5, toast.scaleY*5)
            .setRotation(toast.rotation)


        this.input.once('pointerdown', () => {
            toast.reverseSpin()
            this.scene.resume(MAIN_SCENE, toast)
            this.scene.stop()
        }, this);
    }
}
