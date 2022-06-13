import { Math, Utils } from 'phaser'

import tileModel from '@/models/TileModel'
import tilesConfig from '@/configs/tiles'

export default class GridService
{
  constructor ({ frames, grid })
  {
    this.gridModel = {}
    this.frames = frames
    this.countTypes = this.frames.length
    this.grid = grid
    this.tileModel = tileModel

    this.#generate()
  }

  #addToGridModel (x, y, tile)
  {
    if (!this.gridModel[x]) this.gridModel[x] = {}

    const data = {
      ...this.tileModel,
      ...tile,
      posOnGrid: { x, y },
      empty: false,
    }

    this.gridModel[x][y] = data

    return data
  }

  #createTile ()
  {
    const tile = this.#randomTile()
    const name = Utils.String.UUID()

    return { ...tile, name }
  }

  #randomTile ()
  {
    const n = Math.Between(0, this.countTypes - 1)
    const frame = this.frames[n]
    const empty = false
    const tile = { ...tilesConfig[frame], empty }

    if (!tile) throw(`Not found frame: ${frame}`)
    return tile
  }

  #getTileOnTopRecursive (stertX, startY)
  {
    const { w, h } = this.grid
    let result = null

    const func = (x, y) =>
    {
      if (x < 0 || y < 0 || x >= h || y >= w) return

      const tile = this.getTile(x, y)

      if (!tile) return

      if (!tile.empty)
      {
        result = tile
        return
      }

      func(tile.x, tile.y - 1)
    }
    func(stertX, startY - 1)

    return result
  }

  #getNearestRecursive (startX, startY, condition)
  {
    const { w, h } = this.grid
    const result = []

    const func = (x, y) =>
    {
      if (x < 0 || y < 0 || x >= h || y >= w) return

      const tile = this.getTile(x, y)
      
      if (!tile || tile.check || !condition(tile)) return

      result.push({ x, y })

      this.#updateTileModel (x, y, { check: true })

      func(x - 1, y)
      func(x + 1, y)
      func(x, y - 1)
      func(x, y + 1)
    }
    
    func(startX, startY)

    this.#resetCheckTiles()

    return result
  }

  #resetCheckTiles ()
  {
    this.#updateTilesModelAll({ check: false })
  }

  #resetTile (x, y)
  {
    const { posOnGrid, name } = this.getTile(x, y)
    return this.#updateTileModel(x, y, { ...this.tileModel, posOnGrid, name })
  }

  #relocationTile (tile, x, y)
  {
    this.#updateTileModel(x, y, tile)
    this.#resetTile (tile.posOnGrid.x, tile.posOnGrid.y)
  }

  #updateTilesModelAll (data = {}, x, y)
  {
    this.eachGridData((x, y) =>
      {
        this.#updateTileModel(x, y, data)
      })
  }

  #updateTileModel (x, y, data = {})
  {
    if (this.gridModel && this.gridModel[x] && this.gridModel[x][y])
    {
      this.gridModel[x][y] = { ...this.getTile(x, y), ...data }
      return this.getTile(x, y)
    }
    return null
  }

  #generate ()
  {
    this.eachGridData((x, y) =>
      {
        const tileNew = this.#createTile()
        this.#addToGridModel(x, y, tileNew)
      })
  }

  getGridData ()
  {
    if (this.gridModel && Object.keys(this.gridModel).length)
    {
      return this.gridModel
    }
    return null
  }

  getTile (x, y)
  {
    const grid = this.getGridData()

    if (grid && this.gridModel[x] && this.gridModel[x][y])
    {
      return grid[x][y]
    }
    return null
  }

  eachGridData (action)
  {
    const { w, h } = this.grid

    for (let y = 0; y < w; y++)
    {
      for (let x = 0; x < h; x++)
      {
        action(x, y)
      }
    }
  }

  eachGridDataReverse (action)
  {
    const { w, h } = this.grid

    for (let x = h - 1; x >= 0; x--)
    {
      for (let y = w - 1; y >= 0; y--)
      {
        action(x, y)
      }
    }
  }

  fallTiles ()
  {
    if (!this.getGridData()) return

    const tilesEmpty = []

    this.eachGridDataReverse((x, y) =>
      {
        const tile = this.getTile(x, y)

        if (tile && tile.empty)
        {
          const tileOnTop = this.#getTileOnTopRecursive(x, y)

          if (tileOnTop)
          {
            this.#relocationTile(tileOnTop, x, y)
          }
          else {
            tilesEmpty.push({ x, y })
          }
        }
      })

    tilesEmpty.forEach(({ x, y }) =>
      {
        const tileNew = this.#randomTile()
        this.#updateTileModel(x, y, tileNew)
      })
  }

  getNearestTilesByType (tile)
  {
    const { type, posOnGrid: { x, y } } = tile
    return this.#getNearestRecursive(x, y, (o) => o.type === type)
  }

  removeTiles (positionsTiles)
  {
    positionsTiles.forEach(({ x, y }) =>
      {
        this.#resetTile(x, y)
      })
  }

}
