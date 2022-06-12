import { Math } from 'phaser'

import tileModel from '@/models/TileModel'
import tilesConfig from '@/configs/tiles'

export default class GridService
{
  constructor ({ countTypes, grid })
  {
    this.gridModel = {}
    this.countTypes = countTypes
    this.grid = grid
  }

  #addToGridModel (x, y, tile)
  {
    if (!this.gridModel[x]) this.gridModel[x] = {}

    const data = {
      ...tileModel,
      ...tile,
      posOnGrid: { x, y },
      empty: false,
    }

    this.gridModel[x][y] = data

    return data
  }

  generateGrid ({ tiles }, action)
  {
    const { w, h } = this.grid

    for (let y = 0; y < w; y++)
    {
      for (let x = 0; x < h; x++)
      {
        if (!this.gridModel[x] || !this.gridModel[x][y] || this.gridModel[x][y].empty)
        {
          const tileData = this.generateTile({ tiles })
          const tile = this.#addToGridModel(x, y, tileData)

          action(tile)
        }
      }
    }
  }

  generateTile ({ tiles })
  {
    const n = Math.Between(0, this.countTypes - 1)
    const frame = tiles[n]
    const tile = tilesConfig[frame]

    if (!tile) throw(`Not found tile: ${frame}`)
    return tile
  }

  selectNearestByType (tile)
  {
    const { type, posOnGrid: { x, y } } = tile
    return this.recursiveCheckNearest(x, y, (o) => o.type === tile.type)
  }

  recursiveCheckNearest (startX, startY, condition)
  {
    const { w, h } = this.grid
    const result = []

    const check = (x, y) =>
    {
      if (x < 0 || y < 0 || x > h - 1 || y > w - 1) return

      const tile = this.gridModel[x][y]
      
      if (!tile || tile.check || !condition(tile)) return

      result.push({ x, y })
      tile.check = true

      check(x - 1, y)
      check(x + 1, y)
      check(x, y - 1)
      check(x, y + 1)
    }
    
    check(startX, startY)

    this.resetCheckTiles()

    return result
  }

  resetCheckTiles ()
  {
    this.updateTilesModelAll({ check: false })
  }

  resetTile ({ x, y })
  {
    const { posOnGrid } = this.gridModel[x][y]
    this.updateTilesModel({ x, y }, { ...tileModel, posOnGrid })
  }

  updateTilesModelAll (data = {}, x, y)
  {
    const { w, h } = this.grid

    for (let y = 0; y < w; y++)
    {
      for (let x = 0; x < h; x++)
      {
        this.updateTilesModel({ x, y }, data)
      }
    }
  }

  updateTilesModel ({ x, y }, data = {})
  {
    Object.assign(this.gridModel[x][y], data)
  }

  removeTiles (tiles)
  {
    tiles.forEach(({ x, y }) =>
      {
        this.resetTile({ x, y })
      })
  }

}
