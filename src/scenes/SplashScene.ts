import Phaser from 'phaser'
import {MAIN_SCENE} from "~/scenes/MainScene";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {SPLASH_SCREEN} from "~/const/Assets";

export const SPLASH_SCENE = 'SplashScene'
export default class SplashScene extends Phaser.Scene {

    constructor() {
        super({ key: SPLASH_SCENE })
    }

    create() {

        this.anims.create({key: 'splashGif', frames: this.anims.generateFrameNames(SPLASH_SCREEN, { start: 0, end: 87 }), repeat: -1, frameRate: 6})
        this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, SPLASH_SCREEN).setDisplaySize(DEFAULT_WIDTH, DEFAULT_HEIGHT).play('splashGif')

        const loadingText = this.make.text({
            x: DEFAULT_WIDTH/2,
            y: DEFAULT_HEIGHT*0.8,
            style: {font: '30px monospace', fill: '#ffffff'}
        })
        loadingText.setText('Loading...')
        loadingText.setOrigin(0.5, 0.5)

        setTimeout(() => {
            this.scene.start(MAIN_SCENE)
        }, 4000)
    }
}
