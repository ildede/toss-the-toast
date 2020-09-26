import Phaser from 'phaser'
import MainScene from '~/scenes/MainScene'
import {SPLAT_1, SPLAT_1_POPUP, SPLAT_SFX} from "~/const/Assets";

export default class TossLimit extends Phaser.Physics.Arcade.Sprite {

    readonly SPLAT_BOBBLES: { a: string; t: string }[] = [{t:SPLAT_1,a:SPLAT_1_POPUP}]
    private readonly SFX: string[]
    private readonly hasBobble: boolean;

    constructor(scene: MainScene, x: number, y: number, texture: string, width: number, height: number, hasBobble?: boolean, sfx?: string[]) {
        super(scene, x, y, texture)
        this.hasBobble = hasBobble === undefined ? true : hasBobble;
        this.SFX = sfx === undefined ? [SPLAT_SFX] : sfx

        this.setVisible(false)
        scene.add.existing(this)
        scene.physics.add.existing(this, true)

        this.setSize(width, height)
    }

    getSplatBobble: (x: number, y: number) => Phaser.GameObjects.Sprite = (x: number, y: number) => {
        const bobble = this.SPLAT_BOBBLES[0]
        return this.scene.add.sprite(x, y, bobble.t)
            .play(bobble.a)
            .setVisible(this.hasBobble)
    }

    getSFX() {
        const index = this.SFX.length === 1
            ? 0
            : Math.floor(Math.random() * this.SFX.length)
        return this.SFX[index]
    }
}
