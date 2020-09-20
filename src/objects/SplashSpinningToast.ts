import Phaser from 'phaser'
import SplashScene from "~/scenes/SplashScene";

export default class SplashSpinningToast extends Phaser.GameObjects.Sprite {
    readonly TEXTURE: string;
    readonly ANIM: string;

    constructor(scene: SplashScene, x: number, y: number, texture: string, anim: string) {
        super(scene, x, y, texture)

        this.TEXTURE = texture
        this.ANIM = anim
        scene.add.existing(this)
        this.setScale(0.4, 0.4)

        this.anims.play(anim)
    }
}
