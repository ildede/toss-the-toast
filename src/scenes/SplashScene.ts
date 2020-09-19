import Phaser from 'phaser'
import {MAIN_SCENE} from "~/scenes/MainScene";

export const SPLASH_SCENE = 'SplashScene'
export default class SplashScene extends Phaser.Scene {

    constructor() {
        super({ key: SPLASH_SCENE })
    }

    create() {
        const width = this.cameras.main.width
        const height = this.cameras.main.height
        const loadingText = this.make.text({
            x: width/2,
            y: height/2,
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        })
        loadingText.setText('Splash Screen')
        loadingText.setOrigin(0.5, 0.5)

        setTimeout(() => {
            this.scene.start(MAIN_SCENE)
        }, 4000)
    }
}
