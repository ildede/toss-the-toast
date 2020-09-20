import Phaser from 'phaser'
import {MAIN_SCENE} from "~/scenes/MainScene";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {SPLASH_SCREEN, TOAST_EGG} from "~/const/Assets";
import SplashSpinningToast from "~/objects/SplashSpinningToast";
import OutlinePipeline from "~/ext/OutlinePipeline";

export const SPLASH_SCENE = 'SplashScene'
export default class SplashScene extends Phaser.Scene {

    constructor() {
        super({ key: SPLASH_SCENE })
    }

    create() {
        (this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer).addPipeline(OutlinePipeline.KEY, new OutlinePipeline(this.game));

        this.anims.create({key: 'splashGif', frames: this.anims.generateFrameNames(SPLASH_SCREEN, { start: 0, end: 87 }), repeat: -1, frameRate: 6})
        this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT*0.4, SPLASH_SCREEN).setScale(2,2).play('splashGif')

        // const loadingText = this.make.text({
        //     x: DEFAULT_WIDTH/2,
        //     y: DEFAULT_HEIGHT*0.8,
        //     style: {font: '30px monospace', fill: '#ffffff'}
        // })
        // loadingText.setText('Loading...')
        // loadingText.setOrigin(0.5, 0.5)

        const toast = new SplashSpinningToast(this, TOAST_EGG).setInteractive({ useHandCursor: true })
        toast.on('pointerdown', () => {
            this.cameras.main.fadeOut(100)
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.scene.start(MAIN_SCENE)
                }
            })
        })
        toast.on('pointerover', () => {
            toast.setPipeline(OutlinePipeline.KEY)
            toast.pipeline.setFloat2(
                "uTextureSize",
                toast.displayWidth,
                toast.displayHeight
            )
        })
        toast.on('pointerout', () => {
            toast.resetPipeline()
        })
    }
}
