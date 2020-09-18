import Phaser from 'phaser'

import MainScene from './scenes/MainScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [MainScene]
}

export default new Phaser.Game(config)
