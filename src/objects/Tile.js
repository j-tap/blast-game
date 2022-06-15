import { Math } from 'phaser'

import tileModel from '@/models/TileModel'
import tilesConfig from '@/configs/tiles'

export default class Tile
{
  #possibleFrames

  constructor ({ frames, name, posOnGrid })
  {
    this.reset()

    this.#possibleFrames = frames
    this.model = tileModel
    if (name) this.name = name
    if (posOnGrid) this.posOnGrid = posOnGrid
  }

  setPosition (x, y)
  {
    this.posOnGrid = {}
    this.posOnGrid.x = x
    this.posOnGrid.y = y

    return this
  }

  setName (name)
  {
    this.name = name
    return this
  }

  update (data = {})
  {
    const exclude = ['posOnGrid']
    Object.keys(this.model)
      .forEach(key =>
      {
        if (!exclude.includes(key) && data[key] !== undefined)
          this[key] = data[key]
      })

    return this
  }

  clear ()
  {
    const { posOnGrid } = this
    Object.assign(this, this.model, { posOnGrid })
    return this
  }

  reset ()
  {
    Object.assign(this, this.model)
    return this
  }

  random ()
  {
    this.empty = false
    const n = Math.Between(0, this.#possibleFrames.length - 1)
    const frame = this.#possibleFrames[n]
    if (!frame) throw(`Not found frame: ${frame}`)

    Object.assign(this, tilesConfig[frame])

    this.frame = frame

    return this
  }
}
