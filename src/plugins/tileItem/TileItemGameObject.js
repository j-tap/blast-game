import { GameObjects, Math } from 'phaser'

export default class TileItemGameObject extends GameObjects.Image
{
  constructor(scene, x, y, { tile })
  {
    const key = 'tiles-spr'
    const { type, color, frame, posOnGrid } = tile

    super(scene, x, y, key, frame)

    this.type = type
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

  remove ()
  {
    const particlesSprite = 'particles-spr'
    const emiter = this.scene.add.particles(particlesSprite)
      .createEmitter({
        x: 400,
        y: 400,
        lifespan: 4000,
        angle: { min: 225, max: 315 },
        speed: { min: 300, max: 500 },
        scale: { start: 0.6, end: 0 },
        gravityY: 300,
        bounce: 0.9,
        bounds: { x: 250, y: 0, w: 350, h: 0 },
        collideTop: false,
        collideBottom: false,
        blendMode: 'ADD',
        frame: [ 'particle-1', 'particle-2', 'particle-3' ],
      })

    // this.destroy()
  }

}
