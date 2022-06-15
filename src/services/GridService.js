import Tile from '@/objects/Tile'

export default class GridService
{
  constructor ({ frames, grid })
  {
    this.gridTiles = {}
    this.frames = frames
    this.grid = grid

    this.createdIndex = 0
    this.posByName = {}

    this.#generate()
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

      this.#updateTile (x, y, { check: true })

      func(x - 1, y)
      func(x + 1, y)
      func(x, y - 1)
      func(x, y + 1)
    }
    
    func(startX, startY)

    this.#updateTilesModelAll({ check: false })

    return result
  }

  #removeTile (x, y)
  {
    this.#removePosByName({ x, y })
    const tile = this.getTile(x, y)
    tile.clear()
  }

  #relocationTile (tile, x, y)
  {
    const prevX = tile.posOnGrid.x
    const prevY = tile.posOnGrid.y

    this.#updateTile(x, y, tile)
    this.#removeTile(prevX, prevY)
  }

  #updateTilesModelAll (data = {}, x, y)
  {
    this.eachGrid((x, y) =>
    {
      this.#updateTile(x, y, data)
    })
  }

  #updateTile (x, y, data = {})
  {
    if (this.getGridTiles())
    {
      const tile = this.getTile(x, y)

      if (tile)
      {
        if (data.name) this.#setPosByName(data.name, { x, y })

        return tile.update(data)
      }
    }
    return null
  }

  #generate ()
  {
    this.eachGrid((x, y) =>
    {
      this.addToGridTiles(x, y, this.createTileRandom())
    })
  }

  addToGridTiles (x, y, tileData)
  {
    if (!this.gridTiles[x]) this.gridTiles[x] = {}

    this.gridTiles[x][y] = tileData.setPosition(x, y)

    const tile = this.getTile(x, y)

    this.#setPosByName(tile.name, { x, y })

    return tile
  }

  createTileRandom ()
  {
    const result = new Tile({
        frames: this.frames,
        name: `tl-${this.createdIndex}`,
      })
      .random()

    this.createdIndex++

    return result
  }

  getGridTiles ()
  {
    if (this.gridTiles && Object.keys(this.gridTiles).length)
    {
      return this.gridTiles
    }
    return null
  }

  getTile (x, y)
  {
    const grid = this.getGridTiles()

    if (grid && this.gridTiles[x] && this.gridTiles[x][y])
    {
      return grid[x][y]
    }
    return null
  }

  getTileByName (name)
  {
    const posOnGrid = this.posByName[name]

    if (posOnGrid)
    {
      const { x, y } = posOnGrid
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
    if (!this.getGridTiles()) return

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
      this.addToGridTiles(x, y, this.createTileRandom())
    })
  }

  getNearestTilesByType (tile)
  {
    const { type, posOnGrid: { x, y } } = tile
    return this.#getNearestRecursive(x, y, (o) => o.type === type)
  }

  getNearestTilesRadius (tile, radius)
  {
    const { type, posOnGrid: { x, y } } = tile
    return this.#getNearestRecursive(x, y, (o) =>
      {
        return Math.abs(x - o.posOnGrid.x) <= radius
          && Math.abs(y - o.posOnGrid.y) <= radius
      })
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
