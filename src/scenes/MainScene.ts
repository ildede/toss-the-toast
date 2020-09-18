import Phaser from 'phaser'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "~/main";
import {ARROW, BACKGROUND, PARTICLE, TOAST} from "~/const/Assets";

export const MAIN_SCENE = 'MainScene'
export default class MainScene extends Phaser.Scene {

    private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
    private arrow!: Phaser.GameObjects.Image;
    private toast: Phaser.Physics.Arcade.Image | undefined;

    constructor() {
        super({ key: MAIN_SCENE })
    }

    create() {
        this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, BACKGROUND)
            .setScale(2,2)
        this.arrow = this.add.image(DEFAULT_WIDTH*0.15, DEFAULT_HEIGHT*0.6, ARROW)
            .setScale(0.4, 0.4)
    }

    update(time: number, delta: number) {

        this.input.on('pointermove', (pointer) => {
            const cursor = pointer;
            const angle = Phaser.Math.Angle.Between(this.arrow.x, this.arrow.y, cursor.x, cursor.y)
            this.arrow.setRotation(angle)
        }, this);

        this.input.on('pointerdown', (pointer) => {
            const cursor = pointer;

            if (!this.toast || (this.toast.body.velocity.y == 0 && this.toast.body.velocity.x == 0)) {
                const particles = this.add.particles(PARTICLE)
                this.emitter = particles.createEmitter({
                    speed: 70,
                    scale: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD
                })
                if (this.toast) {
                    this.toast.destroy()
                }
                this.toast = this.physics.add.image(this.arrow.x, this.arrow.y, TOAST).setScale(0.4, 0.4)
                this.toast.setCollideWorldBounds(true, 0, 0)
                this.toast.setAngularVelocity(200)

                this.physics.moveTo(this.toast, cursor.x, cursor.y, 800);

                this.emitter.startFollow(this.toast)
            }
        }, this);

        if (this.toast) {
            if (this.toast.body.velocity.y == 0) {
                this.toast.setAngularVelocity(0)
            }

            if (this.toast.body.velocity.x == 0 && this.toast.body.velocity.y == 0) {
                this.emitter.stop()
            }
        }

        super.update(time, delta);
    }
}
