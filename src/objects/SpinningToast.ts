import Phaser from "phaser";
import {TOAST} from "~/const/Assets";
import SpinningScene from "~/scenes/SpinningScene";
import Toast from "~/objects/Toast";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";

export default class SpinningToast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: SpinningScene, toast: Toast) {
        super(scene, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, TOAST)

        scene.add.existing(this)
        this.setScale(toast.scaleX*5, toast.scaleY*5)
        this.setRotation(toast.rotation)

        this.scene.physics.add.existing(this)
        this.setImmovable(true)
        this.body['setAllowGravity'](false)
        this.setAngularVelocity(300)
    }
}
