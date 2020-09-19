import Phaser from 'phaser'
import {
    ARROW,
    BACKGROUND, IDLE_BGM,
    LOST_SFX,
    PLATE, SLIP_SFX,
    SPEED_BG,
    SPEED_BG_ANIM, SPIN_BGM,
    SPLAT_SFX,
    TOAST,
    TOAST_ANIM,
    WIN_SFX,
    WOOSH_SFX
} from '~/const/Assets'

export const PRELOAD_SCENE = 'PreloadScene'

const defaultConfig = (width: number, height: number) => {
    return {
        x: width,
        y: height,
        style: {
            font: '25px monospace',
            fill: '#ffffff'
        }
    }
}

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: PRELOAD_SCENE })
    }

    preload() {
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        const loadingText = this.make.text(defaultConfig(width/2, height/2-20))
        loadingText.setText('Loading...')
        loadingText.setOrigin(0.5, 0.5)

        const assetText = this.make.text(defaultConfig(width/2, height/2+20))
        assetText.setOrigin(0.5, 0.5)

        this.load.on('fileprogress', file => assetText.setText('Loading asset: ' + file.key))
        this.load.on('complete', () => [loadingText, assetText].forEach(e => e.destroy()))

        this.load.image(BACKGROUND, 'assets/background.png')
        this.load.image(PLATE, 'assets/plate.png')
        this.load.atlas(TOAST, 'assets/toastegg/toastegg.png', 'assets/toastegg/toastegg_atlas.json')
        this.load.animation(TOAST_ANIM, 'assets/toastegg/toastegg_anim.json')
        this.load.atlas(SPEED_BG, 'assets/speedbg/speedbg.png', 'assets/speedbg/speedbg_atlas.json')
        this.load.animation(SPEED_BG_ANIM, 'assets/speedbg/speedbg_anim.json')

        this.load.image(ARROW, 'assets/arrow.png')
        this.load.audio(LOST_SFX, 'music/lostSFX.mp3')
        this.load.audio(SPLAT_SFX, 'music/splatSFX.mp3')
        this.load.audio(WIN_SFX, 'music/winSFX.mp3')
        this.load.audio(WOOSH_SFX, 'music/wooshSFX.mp3')
        this.load.audio(SLIP_SFX, 'music/slipSFX.mp3')
        this.load.audio(IDLE_BGM, 'music/idleBGM.mp3')
        this.load.audio(SPIN_BGM, 'music/spinningBGM.mp3')
    }

    create() {
        import('./MainScene').then(mainScene => {
            this.scene.add(mainScene.MAIN_SCENE, mainScene.default, true)
        })
        import('./SpinningScene').then(spinningScene => {
            this.scene.add(spinningScene.SPINNING_SCENE, spinningScene.default, false)
        })
    }
}
