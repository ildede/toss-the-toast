import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {TOAST_SCALE} from "~/const/Config";

export default class Toast extends Phaser.Physics.Arcade.Sprite {
    readonly animName: string;
    readonly textureName: string;

    constructor(scene: MainScene, data: { texture: string; anim: string }) {
        super(scene, scene.START_X, scene.START_Y, data.texture)

        this.animName = data.anim
        this.textureName = data.texture
        scene.add.existing(this)

        this.setScale(TOAST_SCALE, TOAST_SCALE)
    }

    toss(cursorX: number, cursorY: number) {
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true, 0, 0)
        this.setBodySize(300,200,true)

        this.anims.play(this.animName)
        this.scene.physics.moveTo(this, cursorX, cursorY, 900)
    }

    land() {
        this.anims.stop()
        this.setVelocity(0, 0)
        this.body['setAllowGravity'](false)
    }

    splat() {
        this.anims.stop()
        this.setVelocity(0, 0)
    }
}
