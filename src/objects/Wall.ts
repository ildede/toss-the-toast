import Phaser from 'phaser'
import {PLATE} from '~/const/Assets'
import MainScene from '~/scenes/MainScene'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main"

export default class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene) {
        super(scene, DEFAULT_WIDTH*0.08, DEFAULT_HEIGHT*0.5, PLATE)

        this.setVisible(false)
        scene.add.existing(this)
        scene.physics.add.existing(this, true)

        this.setSize(50, DEFAULT_HEIGHT*2)
    }
}
