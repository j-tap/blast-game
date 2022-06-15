import { GameObjects } from 'phaser'

import GridService from '@/services/GridService'

export default class GridTilesGameObject extends GameObjects.Container
{
  constructor(scene, x, y, { grid, tiles, minTilesTarget })
  {
    super(scene, x, y)

    this.imageBg = 'grid-bg'
    this.grid = grid
    this.tilesFrames = tiles
    this.minTilesTarget = minTilesTarget

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

    this.scene.time.delayedCall(200, () =>
    {
      this.containerTiles.setData({ allowFall: true })
    })
  }

  #tileClickHandler ({ tile })
  {
    const tilesTarget = this.getSelectedTiles(tile)
    const isCondition = tilesTarget.length >= this.minTilesTarget

    if (isCondition)
    {
      this.scene.gridService.removeTiles(tilesTarget)
    }
    else {
      const tileObject = this.containerTiles.getByName(tile.name)
      tileObject.unposible()
    }

    this.emit('clickOnTile', { tile, tilesTarget, isCondition })
  }

  #createTileObject (tile)
  {
    const tileObject = this.scene.add.tileItem({ tile })
      .on('click', (...arg) => this.#tileClickHandler(...arg))

    this.containerTiles.add(tileObject)
  }

  getSelectedTiles (tile)
  {
    const bonusName = this.scene.bonusesService.getActive()

    if (bonusName)
    {
      const bonus = this.scene.bonusesService.getBonus(bonusName)
      if (bonus.name === 'bomb')
      {
        const { params } = bonus.accept()
        return this.scene.gridService.getNearestTilesRadius(tile, params.range)
      }
    }
    return this.scene.gridService.getNearestTilesByType(tile)
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
