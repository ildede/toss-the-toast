import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'
import SplashScene from "~/scenes/SplashScene";

export default class SplashSpinningToast extends Phaser.GameObjects.Sprite {

    constructor(scene: SplashScene, texture: string) {
        super(scene, DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.8, texture)

        scene.add.existing(this)
        this.setScale(0.4, 0.4)

        this.anims.play('spinToastEgg')
    }
}
