import Phaser from 'phaser'
import {TOAST_EGG} from '~/const/Assets'
import MainScene from '~/scenes/MainScene'

export default class Toast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene) {
        super(scene, scene.START_X, scene.START_Y, TOAST_EGG)

        scene.add.existing(this)

        this.setScale(0.20, 0.20)
    }

    toss(cursorX: number, cursorY: number) {
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true, 0, 0)
        this.setBodySize(300,200,true)

        this.anims.play('spinToastEgg')
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
