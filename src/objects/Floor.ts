import Phaser from 'phaser'
import {PLATE} from '~/const/Assets'
import MainScene from '~/scenes/MainScene'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";

export default class Floor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene) {
        super(scene, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.8, PLATE)

        this.setVisible(false)
        scene.add.existing(this)
        scene.physics.add.existing(this, true)

        this.setSize(DEFAULT_WIDTH, 50);
    }
}
