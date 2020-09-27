import Phaser from 'phaser'
import {MAIN_SCENE} from "~/scenes/MainScene";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {
    SPLASH_SCREEN,
    TOAST_BUTTER,
    TOAST_BUTTER_SPIN, TOAST_CAT, TOAST_CAT_SPIN, TOAST_CROQ, TOAST_CROQ_SPIN,
    TOAST_EGG,
    TOAST_EGG_SPIN,
    TOAST_JAM,
    TOAST_JAM_SPIN, TOAST_NUTELLA, TOAST_NUTELLA_SPIN, TOAST_PIZZA, TOAST_PIZZA_SPIN
} from "~/const/Assets";
import SplashSpinningToast from "~/objects/SplashSpinningToast";
import OutlinePipeline from "~/ext/OutlinePipeline";

export const SPLASH_SCENE = 'SplashScene'
export default class SplashScene extends Phaser.Scene {

    private availableToasts: { a: string; t: string }[] = [
        {t:TOAST_EGG,a:TOAST_EGG_SPIN},
        {t:TOAST_JAM,a:TOAST_JAM_SPIN},
        {t:TOAST_BUTTER,a:TOAST_BUTTER_SPIN},
        {t:TOAST_CROQ,a:TOAST_CROQ_SPIN},
        {t:TOAST_NUTELLA,a:TOAST_NUTELLA_SPIN},
        {t:TOAST_PIZZA,a:TOAST_PIZZA_SPIN},
        {t:TOAST_CAT,a:TOAST_CAT_SPIN}
        ]

    constructor() {
        super({ key: SPLASH_SCENE })
    }

    create(data: { toastCount: number }) {
        let toastUnlocked = data.toastCount || 1
        // if (toastUnlocked > 7) {
            toastUnlocked = 7
        // }

        this.anims.create({key: 'splashGif', frames: this.anims.generateFrameNames(SPLASH_SCREEN, { start: 0, end: 87 }), repeat: -1, frameRate: 6})
        this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.4, SPLASH_SCREEN).setScale(2,2).play('splashGif')

        const toasts = this.add.group()
        switch (toastUnlocked) {
            case 1:
                toasts.add(new SplashSpinningToast(this, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }))
                break
            case 2:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.6, DEFAULT_HEIGHT*0.8, TOAST_JAM, TOAST_JAM_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
            case 3:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.3, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.8, TOAST_JAM, TOAST_JAM_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.7, DEFAULT_HEIGHT*0.8, TOAST_BUTTER, TOAST_BUTTER_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
            case 4:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.2, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.8, TOAST_JAM, TOAST_JAM_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.6, DEFAULT_HEIGHT*0.8, TOAST_BUTTER, TOAST_BUTTER_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.8, DEFAULT_HEIGHT*0.8, TOAST_CROQ, TOAST_CROQ_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
            case 5:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.1, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.3, DEFAULT_HEIGHT*0.8, TOAST_JAM, TOAST_JAM_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.8, TOAST_BUTTER, TOAST_BUTTER_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.7, DEFAULT_HEIGHT*0.8, TOAST_CROQ, TOAST_CROQ_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.9, DEFAULT_HEIGHT*0.8, TOAST_NUTELLA, TOAST_NUTELLA_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
            case 6:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.2, DEFAULT_HEIGHT*0.75, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.75, TOAST_JAM, TOAST_JAM_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.6, DEFAULT_HEIGHT*0.75, TOAST_BUTTER, TOAST_BUTTER_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.8, DEFAULT_HEIGHT*0.75, TOAST_CROQ, TOAST_CROQ_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.3, DEFAULT_HEIGHT*0.9, TOAST_NUTELLA, TOAST_NUTELLA_SPIN).setInteractive({ useHandCursor: true }),
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.7, DEFAULT_HEIGHT*0.9, TOAST_PIZZA, TOAST_PIZZA_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
            case 7:
                toasts.add(new SplashSpinningToast(this, DEFAULT_WIDTH*0.5, DEFAULT_HEIGHT*0.8, TOAST_CAT, TOAST_CAT_SPIN, true).setInteractive({ useHandCursor: true }))
                break
            default:
                toasts.addMultiple([
                    new SplashSpinningToast(this, DEFAULT_WIDTH*0.4, DEFAULT_HEIGHT*0.8, TOAST_EGG, TOAST_EGG_SPIN).setInteractive({ useHandCursor: true })
                ])
                break
        }

        toasts.getChildren().forEach(o => o.on('pointerdown', () => {
            const t = (o as SplashSpinningToast)
            this.cameras.main.fadeOut(100)
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.scene.start(MAIN_SCENE, { texture: t.TEXTURE, anim: t.ANIM, toastCount: toastUnlocked, unlimitedSpinning: t.HAS_CAT })
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
