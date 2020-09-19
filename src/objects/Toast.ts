import Phaser from 'phaser'
import {TOAST} from '~/const/Assets'
import MainScene from '~/scenes/MainScene'

export default class Toast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene) {
        super(scene, scene.START_X, scene.START_Y, TOAST)

        scene.add.existing(this)

        this.setScale(0.25, 0.25)
    }

    toss(cursorX: number, cursorY: number) {
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true, 0, 0)

        this.anims.play('spinToastEgg')
        this.scene.physics.moveTo(this, cursorX, cursorY, 1000)
    }

    land() {
        this.anims.stop()
    }
}
