import Phaser from 'phaser'
import {MAIN_SCENE} from "~/scenes/MainScene";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {SPLASH_SCREEN, TOAST_EGG, TOAST_JAM} from "~/const/Assets";
import SplashSpinningToast from "~/objects/SplashSpinningToast";
import OutlinePipeline from "~/ext/OutlinePipeline";

export const SPLASH_SCENE = 'SplashScene'
export default class SplashScene extends Phaser.Scene {

    constructor() {
        super({ key: SPLASH_SCENE })
    }

    create(data: { toastCount: number }) {
        const toastUnlocked = data.toastCount || 1

        this.anims.create({key: 'splashGif', frames: this.anims.generateFrameNames(SPLASH_SCREEN, { start: 0, end: 87 }), repeat: -1, frameRate: 6})
        this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.4, SPLASH_SCREEN).setScale(2,2).play('splashGif')

        const toasts = this.add.group([
            new SplashSpinningToast(this, DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.8, TOAST_EGG, 'spinToastEgg').setInteractive({ useHandCursor: true }),
            new SplashSpinningToast(this, DEFAULT_WIDTH*0.6, DEFAULT_HEIGHT*0.8, TOAST_JAM, 'spinToastJam').setInteractive({ useHandCursor: true })
        ])
        toasts.getChildren().forEach(o => o.on('pointerdown', () => {
            const t = (o as SplashSpinningToast)
            this.cameras.main.fadeOut(100)
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.scene.start(MAIN_SCENE, { texture: t.TEXTURE, anim: t.ANIM, toastCount: toastUnlocked })
                }
            })
        }))
        toasts.getChildren().forEach(o => o.on('pointerover', () => {
            const t = (o as SplashSpinningToast)
            t.setPipeline(OutlinePipeline.KEY)
            t.pipeline.setFloat2(
                "uTextureSize",
                t.displayWidth,
                t.displayHeight
            )
        }))
        toasts.getChildren().forEach(o => o.on('pointerout', () => {
            const t = (o as SplashSpinningToast)
            t.resetPipeline()
        }))
    }
}
