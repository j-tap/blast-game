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
      frames: this.tilesFrames,
      grid,
    })

    this.#draw()
  }

  #draw ()
  {
    const padding = { x: 16, y: 13 }
    const gridImage = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(0)
      .setScale(.32)

    this.containerTiles = this.scene.add.container(this.x + padding.x, this.y + padding.y)
      .setSize(gridImage.displayWidth, gridImage.displayHeight)
      .setDepth(1)

    this.add(gridImage, this.containerTiles, tilesMask)

    const tilesMask = this.scene.make.graphics()
      .fillRect(
        this.containerTiles.x,
        this.containerTiles.y,
        this.containerTiles.displayWidth - padding.x * 2,
        this.containerTiles.displayHeight - padding.y * 2
      )
      .createGeometryMask()

    this.containerTiles.setMask(tilesMask)
  }

  #tileClickHandler ({ tile, tilesSimilar })
  {
    const isCondition = tilesSimilar.length >= this.minSimilarTiles

    if (isCondition)
    {
      this.scene.gridService.removeTiles(tilesSimilar)
    }
    else {
      const tileObject = this.containerTiles.getByName(tile.name)
      tileObject.unposible()
    }

    this.emit('clickOnTile', { tile, tilesSimilar, isCondition })
  }

  #createTileObject (tile)
  {
    const tileObject = this.scene.add.tileItem({ tile })
      .on('click', (...arg) => this.#tileClickHandler(...arg))

    this.containerTiles.add(tileObject)
  }

  gridUpdate ()
  {
    const tilesObjects = this.containerTiles.getAll()

    tilesObjects.forEach(tileObject =>
    {
      const tileModel = this.scene.gridService.getTileByName(tileObject.name)

      if (!tileModel || tileModel.empty)
      {
        tileObject.remove()
      }
      else {
        tileObject.updateTile(tileModel)
      }
    })

    this.scene.gridService.eachGrid((x, y) =>
    {
      const tileModel = this.scene.gridService.getTile(x, y)

      if (tileModel && !tileModel.empty)
      {
        const tileObject = this.containerTiles.getByName(tileModel.name)

        if (!tileObject)
        {
          this.#createTileObject(tileModel)
        }
      }
    })
  }
}
