import Phaser from 'phaser'
import {SPEED_BG} from '~/const/Assets'
import SpinningScene from '~/scenes/SpinningScene'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'

export default class SpeedBackground extends Phaser.GameObjects.Sprite {

    constructor(scene: SpinningScene) {
        super(scene, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, SPEED_BG)

        scene.add.existing(this)
        this.setScale(1.6, 1.6)

        // this.setTexture(SPEED_BG, 'speedbg1')
        this.anims.play('speedRun', true, 1)
    }
}
