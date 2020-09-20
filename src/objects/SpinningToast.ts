import Phaser from 'phaser'
import {WOOSH_SFX} from '~/const/Assets'
import SpinningScene from '~/scenes/SpinningScene'
import Toast from '~/objects/Toast'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '~/main'

export default class SpinningToast extends Phaser.GameObjects.Sprite {

    constructor(scene: SpinningScene, toast: Toast) {
        super(scene, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, toast.textureName, toast.frame.name)

        scene.add.existing(this)
        this.setScale(toast.scaleX*5, toast.scaleY*5)

        this.anims.play(toast.animName, true, toast.anims.currentFrame.index)

        this.on('animationrepeat', () => this.scene.sound.play(WOOSH_SFX))
    }
}
