import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene
{
    private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
    private arrow!: Phaser.GameObjects.Image;
    private toast: Phaser.Physics.Arcade.Image | undefined;

    constructor()
    {
        super('main-scene')
    }

    preload()
    {
        this.load.image('background', 'background.png')
        this.load.image('toast', 'toast.png')
        this.load.image('red', 'red.png')
        this.load.image('arrow', 'arrow.png')
    }

    create()
    {
        this.add.image(480, 270, 'background').setScale(1.6,1.6)

        const particles = this.add.particles('red')
        this.emitter = particles.createEmitter({
            speed: 70,
            scale: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD
        })

        this.arrow = this.add.image(100, 250, 'arrow').setScale(0.4, 0.4)
    }

    update(time: number, delta: number) {

        this.input.on('pointermove', (pointer) => {
            const cursor = pointer;
            const angle = Phaser.Math.Angle.Between(this.arrow.x, this.arrow.y, cursor.x, cursor.y)
            this.arrow.setRotation(angle)
        }, this);

        this.input.on('pointerdown', (pointer) => {
            const cursor = pointer;

            if (!this.toast) {
                this.toast = this.physics.add.image(100, 250, 'toast').setScale(0.4, 0.4)
                this.toast.setCollideWorldBounds(true, 0, 0)
                this.toast.setAngularVelocity(200)

                this.physics.moveTo(this.toast, cursor.x, cursor.y, 600);

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
