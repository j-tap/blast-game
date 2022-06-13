import { GameObjects, Math } from 'phaser'

export default class TileItemGameObject extends GameObjects.Image
{
  constructor(scene, x, y, { tile })
  {
    const key = 'tiles-spr'
    const { type, color, colorName, frame, posOnGrid } = tile

    super(scene, x, y, key, frame)

    this.type = type
    this.colorName = colorName
    this.color = color
    this.posOnGrid = posOnGrid

    this.#init()
  }

  #init ()
  {
    this.setOrigin(.5)
    this.setSize(170, 192)
    this.setScale(.32)
    this.setInteractive({ useHandCursor: true })

    this.on('pointerdown', this.#pointerdownHandler)
  }

  #pointerdownHandler ()
  {
    const tile = this
    const tilesSimilar = this.scene.gridService.selectNearestByType(tile)

    this.emit('click', { tile, tilesSimilar })
  }

  checkPosOnGrid (x, y)
  {
    return this.posOnGrid.x === x && this.posOnGrid.y === y
  }

  remove ()
  {
    const { tx, ty } = this.getWorldTransformMatrix()
    const duration = 2000
    const particlesSprite = 'particles-spr'
    const emitter = this.scene.add.particles(particlesSprite)

    emitter.createEmitter({
        x: 0,
        y: 0,
        blendMode: 'ADD',
        lifespan: duration,
        alpha: { 'start': 1, 'end': 0 },
        speed: { 'min': 0, 'max': 200 },
        scale: { 'start': .4, 'end': 0 },
        gravityY: 600,
        bounce: 1,
        maxParticles: 15,
        tint: [this.color],
        frame: ['particle-1'],
      })
      .explode(100, tx, ty)

    this.scene.tweens.add({
        targets: this,
        scale: 0,
        duration: 100,
        onComplete: () =>
        {
          this.destroy()
        },
      })

  }

}
