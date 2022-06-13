import { Math } from 'phaser'

export default class Firework
{
  emitter

  constructor (scene, options = {})
  {
    this.scene = scene
    this.particlesSprite = 'particles-spr'

    this.options = {
      scale: .2,
      maxSpeed: 600,
      life: 1000,
      gravity: 200,
      maxDelay: 200,
      explosionForce: 30,
      ...options,
    }

    this.#create()
  }

  #create ()
  {
    const { maxSpeed, scale, life, gravity } = this.options

    this.emitter = this.scene.add.particles(this.particlesSprite)
      .createEmitter({
        speed: { min: -100, max: maxSpeed },
        angle: { min: 0, max: 360 },
        scale: { start: scale, end: 0 },
        alpha: { start: 1, end: .1 },
        lifespan: life,
        gravityY: gravity,
        active: false,
        frame: [ 'particle-1', 'particle-2', 'particle-3' ],
        blendMode: 'SCREEN',
      })
  }

  #explode ()
  {
    const { centerX, centerY, width } = this.scene.cameras.main
    const { explosionForce } = this.options

    const x = Math.Between(centerX / 2, width / 1.5)
    const y = Math.Between(centerY / 3, centerY / 1.2)

    this.emitter.active = true
    this.emitter.explode(explosionForce, x, y)
  }

  run (repeat = 1)
  {
    const { maxDelay } = this.options

    this.scene.time.addEvent({
      delay: Math.Between(50, maxDelay),
      callback: this.#explode,
      callbackScope: this,
      repeat,
    })
  }
  
}
