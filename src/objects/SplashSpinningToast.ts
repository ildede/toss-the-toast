import Phaser from 'phaser'
import SplashScene from "~/scenes/SplashScene";

export default class SplashSpinningToast extends Phaser.GameObjects.Sprite {
    readonly TEXTURE: string;
    readonly ANIM: string;
    readonly HAS_CAT: boolean;

    constructor(scene: SplashScene, x: number, y: number, texture: string, anim: string, hasCat?: boolean) {
        super(scene, x, y, texture)

        this.TEXTURE = texture
        this.ANIM = anim
        this.HAS_CAT = hasCat || false
        scene.add.existing(this)
        this.setScale(0.3, 0.3)

        this.anims.play(anim)
    }
}
