import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {DEFAULT_TOSS_SPEED, TOAST_SCALE} from "~/const/Config";

export default class Toast extends Phaser.Physics.Arcade.Sprite {
    readonly animName: string;
    readonly textureName: string;
    readonly unlimitedSpinning: boolean;

    constructor(scene: MainScene, data: { texture: string; anim: string, unlimitedSpinning: boolean }) {
        super(scene, scene.START_X, scene.START_Y, data.texture)

        this.animName = data.anim
        this.textureName = data.texture
        this.unlimitedSpinning = data.unlimitedSpinning || false
        scene.add.existing(this)

        this.setScale(TOAST_SCALE, TOAST_SCALE)
    }

    toss(angleGauge: Phaser.GameObjects.Image) {
        this.scene.physics.add.existing(this)
        this.setBodySize(300,200,true)

        this.anims.play(this.animName)
        const vectorRotation = this.scene.physics.velocityFromRotation(angleGauge.rotation, 10000)
        this.scene.physics.moveTo(this, vectorRotation.x, vectorRotation.y, DEFAULT_TOSS_SPEED)
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
        if (!this.unlimitedSpinning) {
            switch (this.anims.currentFrame.index) {
                case 8:
                    this.anims.stopOnFrame(this.anims.currentAnim.frames[0])
                    break;
                case 1:
                    this.anims.stop()
                    break;
                case 2:
                    this.anims.previousFrame()
                    this.anims.stop()
                    break;
                case 3:
                    this.anims.stop()
                    break;
                case 4:
                    this.anims.stopOnFrame(this.anims.currentAnim.frames[4])
                    break;
                case 5:
                    this.anims.stop()
                    break;
                case 6:
                    this.anims.previousFrame()
                    this.anims.stop()
                    break;
                case 7:
                    this.anims.stop()
                    break;
                default:
                    this.anims.stop()
        }
        }
        this.setVelocity(0, 0)
        this.body['setAllowGravity'](false)
    }

    splat() {
        if (!this.unlimitedSpinning) {
            this.anims.stopOnFrame(this.anims.currentAnim.frames[4])
        }
        this.setVelocity(0, 0)
    }
}
