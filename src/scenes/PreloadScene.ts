import Phaser from 'phaser'
import {ARROW, BACKGROUND, PARTICLE, TOAST} from "~/const/Assets";

export const PRELOAD_SCENE = 'PreloadScene'

const defaultConfig = (width: number, height: number) => {
    return {
        x: width,
        y: height,
        style: {
            font: '25px monospace',
            fill: '#ffffff'
        }
    };
}

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: PRELOAD_SCENE })
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.make.text(defaultConfig(width/2, height/2-20));
        loadingText.setText('Loading...');
        loadingText.setOrigin(0.5, 0.5);

        const assetText = this.make.text(defaultConfig(width/2, height/2+20));
        assetText.setOrigin(0.5, 0.5);

        this.load.on('fileprogress', file => assetText.setText('Loading asset: ' + file.key))
        this.load.on('complete', () => [loadingText, assetText].forEach(e => e.destroy()))

        this.load.image(BACKGROUND, 'assets/background.png')
        this.load.image(TOAST, 'assets/toast.png')
        this.load.image(PARTICLE, 'assets/red-particle.png')
        this.load.image(ARROW, 'assets/arrow.png')
    }

    create() {
        const someCondition = true
        if (someCondition) {
            import('./MainScene').then(mainScene => {
                this.scene.add(mainScene.MAIN_SCENE, mainScene.default, true)
            })
        } else {
            console.log('The MainScene class will not even be loaded by the browser')
        }
    }
}
