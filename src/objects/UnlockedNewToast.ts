import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {TOAST_UNLOCKED} from "~/const/Assets";

export default class UnlockedNewToast extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, TOAST_UNLOCKED)

        scene.add.existing(this)

        this.anims.play('bounceToastUnlocked')
    }
}
