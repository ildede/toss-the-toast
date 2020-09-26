import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {TOAST_UNLOCKED, TOAST_UNLOCKED_BOUNCE, WHITEMASK} from "~/const/Assets";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";

export default class UnlockedNewToast extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, TOAST_UNLOCKED)

        scene.add.image(DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.5, WHITEMASK)
        scene.add.existing(this)

        this.anims.play(TOAST_UNLOCKED_BOUNCE)
    }
}
