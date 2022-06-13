import { GameObjects } from 'phaser'

export default class TileItemGameObject extends GameObjects.Image
{
  constructor(scene, { tile })
  {
    const key = 'tiles-spr'
    const { type, color, colorName, frame, posOnGrid, name } = tile

    super(scene, 0, 0, key, frame)

    this.type = type
    this.colorName = colorName
    this.color = color
    this.posOnGrid = posOnGrid
    this.name = name
    this.defaultScale = .32

    this.#init()
  }

  #init ()
  {
    this.setOrigin(.5)
    this.setSize(170, 192)
    this.setScale(this.defaultScale)
    this.setInteractive({ useHandCursor: true })

    const tileX = this.displayWidth * this.posOnGrid.x + this.displayWidth / 2
    const tileY = this.displayHeight * this.posOnGrid.y + this.displayHeight / 2

    this.setX(tileX)
    this.setY(tileY)

    this.on('pointerdown', this.#pointerdownHandler)
  }

  #pointerdownHandler ()
  {
    const tile = this
    const tilesSimilar = this.scene.gridService.getNearestTilesByType(tile)

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
      .setDepth(2)

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

    return new Promise((resolve) =>
      {
        this.scene.tweens.add({
            targets: this,
            scale: 0,
            duration: 100,
            onComplete: () =>
            {
              // this.destroy()
              this.setScale(this.defaultScale)
              resolve()
            },
          })
      })
  }

}
