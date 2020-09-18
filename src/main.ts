import Phaser from 'phaser'

import MainScene from './scenes/MainScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }
        }
    },
    scene: [MainScene]
}

export default new Phaser.Game(config)
