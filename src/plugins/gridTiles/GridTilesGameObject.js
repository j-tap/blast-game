import { GameObjects } from 'phaser'

import GridService from '@/services/GridService'

export default class GridTilesGameObject extends GameObjects.Container
{
  constructor(scene, { grid, tiles, minSimilarTiles })
  {
    super(scene, 'gridTiles')

    this.scene = scene
    this.x = 20
    this.y = 120
    this.imageBg = 'grid-bg'
    this.grid = grid
    this.tilesFrames = tiles
    this.minSimilarTiles = minSimilarTiles

    this.scene.gridService = new GridService({
        countTypes: this.tilesFrames.length,
        grid,
      })

    this.#drawBg()
    this.drawGrid()
  }

  #drawBg ()
  {
    const gridImage = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(0)
      .setScale(.32)

    this.add([gridImage])
  }

  #tileClickHandler ({ tile, tilesSimilar })
  {
    const isCondition = tilesSimilar.length >= this.minSimilarTiles

    if (isCondition)
    {
      this.removeTiles(tilesSimilar)
      // this.drawGrid()
    }

    this.emit('clickOnTile', { tile, tilesSimilar, isCondition })
  }

  drawGrid ()
  {
    if (this.containerTiles)
    {
      this.containerTiles.destroy()
    }

    const tilesObjects = []
    const tileParams = {
      tiles: this.tilesFrames
    }

    this.scene.gridService.generateGrid(tileParams, (tile) =>
      {
        const tileObject = this.scene.add.tileItem(0, 0, { tile })

        tileObject
          .setX(tileObject.displayWidth * tile.posOnGrid.x + tileObject.displayWidth / 2)
          .setY(tileObject.displayHeight * tile.posOnGrid.y + tileObject.displayHeight / 2)
          .on('click', (...arg) => this.#tileClickHandler(...arg))

          tilesObjects.push(tileObject)
      })

    this.containerTiles = this.scene.add.container(16, 13, tilesObjects)

    this.add(this.containerTiles)
  }

  removeTiles (positionsTiles)
  {
    const tiles = this.containerTiles.getAll()

    positionsTiles.forEach(pos =>
      {
        const { x, y } = pos

        tiles.forEach(tile =>
          {
            if (tile.checkPosOnGrid(x, y)) tile.remove()
          })
      })

    this.scene.gridService.removeTiles(positionsTiles)
  }

}
