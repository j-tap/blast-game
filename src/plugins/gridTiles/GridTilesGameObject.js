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
    const gridImage = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(0)
      .setScale(.32)

    this.containerTiles = this.scene.add.container(this.x + 16, this.y + 13)
      .setDepth(1)

    this.scene.gridService.eachGridData((x, y) =>
      {
        const tile = this.scene.gridService.getTile(x, y)
        const tileObject = this.scene.add.tileItem({ tile })
          .on('click', (...arg) => this.#tileClickHandler(...arg))

        this.containerTiles.add(tileObject)
      })

    this.add(gridImage, this.containerTiles)
  }

  #tileClickHandler ({ tile, tilesSimilar })
  {
    const isCondition = tilesSimilar.length >= this.minSimilarTiles
    const sendEmit = ['clickOnTile', { tile, tilesSimilar, isCondition }]

    if (isCondition)
    {
      this.removeTiles(tilesSimilar)
        .then(() =>
        {
          this.emit.apply(this, sendEmit)
        })
    }
    else {
      this.emit.apply(this, sendEmit)
    }
  }

  gridUpdate ()
  {
    const tilesObjects = this.containerTiles.getAll()

    tilesObjects.forEach(tileObject =>
      {
        const { x, y } = tileObject.posOnGrid
        const tile = this.scene.gridService.getTile(x, y)

        tileObject.type = tile.type
        tileObject.colorName = tile.colorName
        tileObject.color = tile.color
        tileObject.setFrame(tile.frame)
      })
  }

  removeTiles (positionsTiles)
  {
    const tilesObjects = this.containerTiles.getAll()

    this.scene.gridService.removeTiles(positionsTiles)

    const promises = []

    positionsTiles.forEach((pos, i) =>
      {
        const { x, y } = pos

        promises[i] = new Promise((resolve) =>
          {
            tilesObjects.forEach(tile =>
              {
                if (tile.checkPosOnGrid(x, y))
                {
                  tile.remove()
                    .then(() => resolve())
                }
              })
          })
      })

    return Promise.all(promises).then(() =>
      {
        this.scene.gridService.fallTiles()
      })
  }

}
