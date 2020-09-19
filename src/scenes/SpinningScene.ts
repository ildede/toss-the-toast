import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import {BACKGROUND} from '~/const/Assets'
import {MAIN_SCENE} from "~/scenes/MainScene";
import Toast from "~/objects/Toast";

export const SPINNING_SCENE = 'SpinningScene'
export default class SpinningScene extends Phaser.Scene {

    constructor() {
        super({ key: SPINNING_SCENE })
    }

    create(toast: Toast) {
        console.log('RUN with ', toast)
        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(1,1)

        this.input.once('pointerdown', () => {
            toast.reverseSpin()
            this.scene.resume(MAIN_SCENE, toast)
            this.scene.stop()
        }, this);
    }
}
