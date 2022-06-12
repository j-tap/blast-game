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
    this.setOrigin(0)
    this.setSize(170, 192)
    this.setScale(.32)
    this.setInteractive({ useHandCursor: true })

    this.on('pointerdown', this.#pointerdownHandler)
    // console.log(this);
    // this.scene.physics.add.existing(this)
  }

  #pointerdownHandler ()
  {
    const tile = this
    const tilesSimilar = this.scene.gridService.selectNearestByType(tile)

    this.emit('click', { tile, tilesSimilar })
  }

}
