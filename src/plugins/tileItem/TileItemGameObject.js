import { GameObjects, Math } from 'phaser'

export default class TileItemGameObject extends GameObjects.Image
{
  constructor(scene, x, y, options = {})
  {
    const key = 'tiles-spr'
    const colorsCount = 5

    const atlas = scene.textures.get(key)
    const n = Math.Between(0, colorsCount - 1)
    const frame = atlas.getFrameNames()[n]

    super(scene, x, y, key, frame)

    this.colorsCount = colorsCount

    this.#init()
  }

  #init ()
  {
    this.setOrigin(0)
    this.setSize(170, 192)
    this.setScale(.32)
    this.setInteractive({ useHandCursor: true })
    // console.log(this);
    // this.scene.physics.add.existing(this)
  }

}
