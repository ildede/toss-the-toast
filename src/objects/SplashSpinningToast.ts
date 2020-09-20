import Phaser from 'phaser'
import SplashScene from "~/scenes/SplashScene";

export default class SplashSpinningToast extends Phaser.GameObjects.Sprite {

    constructor(scene: SplashScene, x: number, y: number, texture: string, anim: string) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        this.setScale(0.4, 0.4)

        this.anims.play(anim)
    }
}
