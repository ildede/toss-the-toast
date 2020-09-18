import Phaser from 'phaser'

import MainScene from './scenes/MainScene'

export const DEFAULT_WIDTH = 1920
export const DEFAULT_HEIGHT = 1080

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }
        }
    },
    render: {
        pixelArt: true
    },
    scene: [MainScene]
}

export default new Phaser.Game(config)
