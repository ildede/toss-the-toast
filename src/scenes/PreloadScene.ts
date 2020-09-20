import Phaser from 'phaser'
import {
    ANGLE_GAUGE,
    ANGLE_POINTER,
    ARROW,
    BACKGROUND,
    COLA,
    FAIL_1,
    FAIL_2,
    IDLE_BGM,
    LOST_SFX, MINUS,
    PLATE, PLUS,
    SLIP_SFX,
    SPEED_BG,
    SPEED_BG_ANIM,
    SPIN_BGM,
    SPLASH_SCREEN,
    SPLAT,
    SPLAT_SFX,
    STRAW,
    TOAST_BUTTER,
    TOAST_BUTTER_ANIM, TOAST_CAT, TOAST_CAT_ANIM,
    TOAST_CROQ,
    TOAST_CROQ_ANIM,
    TOAST_EGG,
    TOAST_EGG_ANIM,
    TOAST_JAM,
    TOAST_JAM_ANIM,
    TOAST_NUTELLA,
    TOAST_NUTELLA_ANIM, TOAST_PIZZA,
    TOAST_PIZZA_ANIM,
    TOAST_UNLOCKED,
    TOAST_UNLOCKED_ANIM,
    WIN_1,
    WIN_2,
    WIN_3,
    WIN_SFX,
    WOOSH_SFX,
    WTF
} from '~/const/Assets'
import OutlinePipeline from "~/ext/OutlinePipeline";

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

export const PRELOAD_SCENE = 'PreloadScene'
export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: PRELOAD_SCENE })
    }

    preload() {
        (this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer).addPipeline(OutlinePipeline.KEY, new OutlinePipeline(this.game))

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
        this.load.atlas(TOAST_UNLOCKED, 'assets/toastunlocked/toastunlocked.png', 'assets/toastunlocked/toastunlocked_atlas.json')
        this.load.animation(TOAST_UNLOCKED_ANIM, 'assets/toastunlocked/toastunlocked_anim.json')

        this.load.atlas(TOAST_EGG, 'assets/toastegg/toastegg.png', 'assets/toastegg/toastegg_atlas.json')
        this.load.animation(TOAST_EGG_ANIM, 'assets/toastegg/toastegg_anim.json')
        this.load.atlas(TOAST_JAM, 'assets/toastjam/toastjam.png', 'assets/toastjam/toastjam_atlas.json')
        this.load.animation(TOAST_JAM_ANIM, 'assets/toastjam/toastjam_anim.json')
        this.load.atlas(SPEED_BG, 'assets/speedbg/speedbg.png', 'assets/speedbg/speedbg_atlas.json')
        this.load.animation(SPEED_BG_ANIM, 'assets/speedbg/speedbg_anim.json')
        this.load.atlas(TOAST_BUTTER, 'assets/toasts/toastbutter/toastbutter.png', 'assets/toasts/toastbutter/toastbutter_atlas.json')
        this.load.animation(TOAST_BUTTER_ANIM, 'assets/toasts/toastbutter/toastbutter_anim.json')
        this.load.atlas(TOAST_CROQ, 'assets/toasts/toastcroq/toastcroq.png', 'assets/toasts/toastcroq/toastcroq_atlas.json')
        this.load.animation(TOAST_CROQ_ANIM, 'assets/toasts/toastcroq/toastcroq_anim.json')
        this.load.atlas(TOAST_NUTELLA, 'assets/toasts/toastnutella/toastnutella.png', 'assets/toasts/toastnutella/toastnutella_atlas.json')
        this.load.animation(TOAST_NUTELLA_ANIM, 'assets/toasts/toastnutella/toastnutella_anim.json')
        this.load.atlas(TOAST_PIZZA, 'assets/toasts/toastpizza/toastpizza.png', 'assets/toasts/toastpizza/toastpizza_atlas.json')
        this.load.animation(TOAST_PIZZA_ANIM, 'assets/toasts/toastpizza/toastpizza_anim.json')
        this.load.atlas(TOAST_CAT, 'assets/toasts/toastcat/toastcat.png', 'assets/toasts/toastcat/toastcat_atlas.json')
        this.load.animation(TOAST_CAT_ANIM, 'assets/toasts/toastcat/toastcat_anim.json')

        this.load.image(STRAW, 'assets/straw.png')
        this.load.image(COLA, 'assets/cola.png')
        this.load.image(PLUS, 'assets/plus.png')
        this.load.image(MINUS, 'assets/minus.png')

        this.load.image(ARROW, 'assets/arrow.png')
        this.load.image(ANGLE_GAUGE, 'assets/anglemeter/angleMeterGauge.png')
        this.load.image(ANGLE_POINTER, 'assets/anglemeter/angleMeterPointer.png')

        this.load.audio(LOST_SFX, 'music/lostSFX.mp3')
        this.load.audio(SPLAT_SFX, 'music/splatSFX.mp3')
        this.load.audio(WIN_SFX, 'music/winSFX.mp3')
        this.load.audio(WOOSH_SFX, 'music/wooshSFX.mp3')
        this.load.audio(SLIP_SFX, 'music/slipSFX.mp3')
        this.load.audio(IDLE_BGM, 'music/idleBGM.mp3')
        this.load.audio(SPIN_BGM, 'music/spinningBGM.mp3')

        this.load.image(WIN_1, 'assets/win_1.png')
        this.load.image(WIN_2, 'assets/win_2.png')
        this.load.image(WIN_3, 'assets/win_3.png')
        this.load.image(FAIL_1, 'assets/fail_1.png')
        this.load.image(FAIL_2, 'assets/fail_2.png')
        this.load.image(SPLAT, 'assets/splat.png')
        this.load.image(WTF, 'assets/wtf.png')

        this.load.image('number0', 'assets/numbers/number0.png')
        this.load.image('number1', 'assets/numbers/number1.png')
        this.load.image('number2', 'assets/numbers/number2.png')
        this.load.image('number3', 'assets/numbers/number3.png')
        this.load.image('number4', 'assets/numbers/number4.png')
        this.load.image('number5', 'assets/numbers/number5.png')
        this.load.image('number6', 'assets/numbers/number6.png')
        this.load.image('number7', 'assets/numbers/number7.png')
        this.load.image('number8', 'assets/numbers/number8.png')
        this.load.image('number9', 'assets/numbers/number9.png')

        this.load.spritesheet(SPLASH_SCREEN, 'assets/splashSpriteSheet.png', {
            frameHeight: 300,
            frameWidth: 600
        })
    }

    create() {
        import('./SplashScene').then(splashScene => {
            this.scene.add(splashScene.SPLASH_SCENE, splashScene.default, true)
        })
        import('./MainScene').then(mainScene => {
            this.scene.add(mainScene.MAIN_SCENE, mainScene.default, false)
        })
        import('./SpinningScene').then(spinningScene => {
            this.scene.add(spinningScene.SPINNING_SCENE, spinningScene.default, false)
        })
    }
}
