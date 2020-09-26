import Phaser from 'phaser'
import {PLATE} from '~/const/Assets'
import MainScene from '~/scenes/MainScene'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'

export default class Plate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene) {
        super(scene, DEFAULT_WIDTH*0.725, DEFAULT_HEIGHT*0.6, PLATE)

        scene.add.existing(this)
        scene.physics.add.existing(this, true)

        this.setScale(0.30, 0.30)
        this.refreshBody()
        this.setSize(this.body.width/2, this.body.height/2)
    }
}
