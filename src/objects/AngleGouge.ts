import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {ANGLE_GAUGE, ANGLE_POINTER} from '~/const/Assets';

export default class AngleGauge extends Phaser.Physics.Arcade.Sprite {
    private bar: Phaser.GameObjects.Image;

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, ANGLE_POINTER)

        this.bar = scene.add.image(x, y, ANGLE_GAUGE)
            .setScale(0.4, 0.4)

        this.setScale(0.4,0.4)
        scene.add.existing(this)
    }
}
