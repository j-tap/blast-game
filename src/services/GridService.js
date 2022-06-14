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

    this.prevIndex = 0
    this.posByName = {}

    this.#generate()
  }

  #addToGridModel (x, y, tile)
  {
    if (!this.gridModel[x]) this.gridModel[x] = {}

    const data = {
      ...this.tileModel,
      ...tile,
      posOnGrid: { x, y },
    }

    this.gridModel[x][y] = data

    this.#setPosByName(data.name, { x, y })

    return data
  }

  #setPosByName (name, { x, y })
  {
    this.posByName[name] = { x, y }
  }

  #removePosByName (val)
  {
    if (typeof val === 'string')
    {
      delete this.posByName[val]
    }
    else if (typeof val === 'object')
    {
      for (const key in this.posByName)
      {
        const { x, y } = this.posByName[key]

        if (x === val.x && y === val.y)
        {
          delete this.posByName[key]
        }
      }
    }
  }

  #createTile ()
  {
    const tile = this.#randomTile()
    const name = `tl-${this.prevIndex}`
    this.prevIndex++

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

      func(tile.posOnGrid.x, tile.posOnGrid.y - 1)
    }

    func(stertX, startY)

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
      
      if (!tile || tile.empty || tile.check || !condition(tile)) return

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

  #removeTile (x, y)
  {
    const { posOnGrid } = this.getTile(x, y)
    this.#removePosByName({ x, y })
    return this.#updateTileModel(x, y, { ...this.tileModel, posOnGrid })
  }

  #relocationTile (tile, x, y)
  {
    const prevX = tile.posOnGrid.x
    const prevY = tile.posOnGrid.y

    this.#updateTileModel(x, y, tile)
    this.#removeTile(prevX, prevY)
  }

  #updateTilesModelAll (data = {}, x, y)
  {
    this.eachGrid((x, y) =>
    {
      this.#updateTileModel(x, y, data)
    })
  }

  #updateTileModel (x, y, data = {})
  {
    if (this.gridModel && this.gridModel[x] && this.gridModel[x][y])
    {
      if (data.name)
      {
        this.#setPosByName(data.name, { x, y })
      }
      const oldData = Utils.Objects.DeepCopy(this.getTile(x, y))
      const newData = Utils.Objects.DeepCopy(data)
      const posOnGrid = { x, y }

      this.gridModel[x][y] = { ...oldData, ...newData, posOnGrid }

      return this.getTile(x, y)
    }
    return null
  }

  #generate ()
  {
    this.eachGrid((x, y) =>
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

  getTileByName (name)
  {
    const pos = this.posByName[name]

    if (pos)
    {
      const { x, y } = pos
      const tile = this.getTile(x, y)

      if (tile && tile.name === name)
      {
        return tile
      }
    }
    return null
  }

  eachGrid (action)
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

  eachGridReverse (action)
  {
    const { w, h } = this.grid

    for (let y = w - 1; y >= 0; y--)
    {
      for (let x = h - 1; x >= 0; x--)
      {
        action(x, y)
      }
    }
  }

  fallTiles ()
  {
    if (!this.getGridData()) return

    const tilesEmpty = []

    this.eachGridReverse((x, y) =>
    {
      const tile = this.getTile(x, y)

      if (tile && tile.empty)
      {
        const tileOnTopNotEmpty = this.#getTileOnTopRecursive(x, y)

        if (tileOnTopNotEmpty)
        {
          this.#relocationTile(tileOnTopNotEmpty, x, y)
        }
        else {
          tilesEmpty.push({ x, y })
        }
      }
    })

    tilesEmpty.forEach(({ x, y }) =>
    {
      const tileNew = this.#createTile()
      this.#addToGridModel(x, y, tileNew)
    })
  }

  getNearestTilesByType (tile)
  {
    const { type, posOnGrid: { x, y } } = tile
    return this.#getNearestRecursive(x, y, (o) => o.type === type)
  }

  shuffle ()
  {
    //
  }

  removeTiles (positionsTiles)
  {
    positionsTiles.forEach(({ x, y }) =>
    {
      this.#removeTile(x, y)
    })

    this.fallTiles()
  }

}
