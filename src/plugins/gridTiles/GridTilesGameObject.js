import { GameObjects } from 'phaser'

import GridService from '@/services/GridService'

export default class GridTilesGameObject extends GameObjects.Container
{
  constructor(scene, x, y, { grid, tiles, minTilesTarget })
  {
    super(scene, x, y)

    this.imageBgName = 'grid-bg'
    this.grid = grid
    this.tilesFrames = tiles
    this.minTilesTarget = minTilesTarget
    this.padding = { x: 16, y: 13 }
    this.prevPosition = { x: 0, y: 0 }

    this.scene.gridService = new GridService({
      frames: this.tilesFrames,
      grid,
    })

    this.#draw()
  }

  #draw ()
  {
    const imageBg = this.scene.add.image(0, 0, this.imageBgName)
      .setOrigin(0)
      .setScale(.32)

    this.containerTiles = this.scene.add.container(this.padding.x, this.padding.y)
      .setSize(imageBg.displayWidth, imageBg.displayHeight)
      .setDepth(1)

    this.add([imageBg, this.containerTiles])

    this.scene.time.delayedCall(200, () =>
    {
      this.containerTiles.setData({ allowFall: true })
    })

    this.setSize(imageBg.displayWidth, imageBg.displayHeight)

    this.#drawMask()
  }

  #drawMask ()
  {
    this.containerTiles.clearMask()

    const tilesMaskGraphic = this.scene.make.graphics()
      .fillRect(
        this.x + this.padding.x,
        this.y + this.padding.y,
        this.containerTiles.displayWidth - this.padding.x * 2,
        this.containerTiles.displayHeight - this.padding.y * 2
      )

    this.containerTiles.setMask(tilesMaskGraphic.createGeometryMask())
  }

  #tileClickHandler ({ tile })
  {
    const { tilesTarget, bonus } = this.getSelectedTiles(tile)
    const isCondition = tilesTarget.length >= this.minTilesTarget

    if (isCondition)
    {
      this.scene.gridService.removeTiles(tilesTarget)
      this.containerTiles.getByName(tile.name)
        .setData('bonus', bonus)
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

  #updateTiles ()
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

  #updatePositionGrid ()
  {
    if (this.prevPosition.x !== this.x)
    {
      this.#drawMask()
    }

    this.prevPosition.x = this.x
    this.prevPosition.y = this.y
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
        const tilesTarget = this.scene.gridService.getNearestTilesRadius(tile, params.range)
        return { tilesTarget, bonus }
      }
    }
    const tilesTarget = this.scene.gridService.getNearestTilesByType(tile)
    return { tilesTarget }
  }

  update ()
  {
    this.#updatePositionGrid()
    this.#updateTiles()
  }
}
