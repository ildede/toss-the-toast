import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'

export default class TossLimit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene, x: number, y: number, texture: string, width: number, height: number) {
        super(scene, x, y, texture)

        this.setVisible(false)
        scene.add.existing(this)
        scene.physics.add.existing(this, true)

        this.setSize(width, height)
    }
}
