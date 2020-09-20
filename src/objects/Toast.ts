import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {DEFAULT_TOSS_SPEED, TOAST_SCALE} from "~/const/Config";

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
        this.setBodySize(300,200,true)

        this.anims.play(this.animName)
        this.scene.physics.moveTo(this, cursorX, cursorY, DEFAULT_TOSS_SPEED)
    }

    land() {
        // currentFrame.index === 8 //BEFORE 100
        // currentFrame.index === 1 //100
        // currentFrame.index === 2 //AFTER 100
        // currentFrame.index === 3 //WTF RIGHT
        // currentFrame.index === 4 //BEFORE SPLAT
        // currentFrame.index === 5 //SUPER SPLAT
        // currentFrame.index === 6 //AFTER SPLAT
        // currentFrame.index === 7 //WTF LEFT
        if (this.anims.currentFrame.index === 8 || this.anims.currentFrame.index === 4) {
            this.anims.nextFrame()
        } else if (this.anims.currentFrame.index === 2 || this.anims.currentFrame.index === 6) {
            this.anims.previousFrame()
        }

        this.anims.stop()
        this.setVelocity(0, 0)
        this.body['setAllowGravity'](false)
    }

    splat() {
        this.anims.stop()
        this.setVelocity(0, 0)
    }
}
