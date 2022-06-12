import { GameObjects } from 'phaser'

export default class GridTilesGameObject extends GameObjects.Container
{
  constructor(scene, { grid })
  {
    super(scene, 'gridTiles')

    this.scene = scene
    this.x = 20
    this.y = 120
    this.imageBg = 'grid-bg'
    this.grid = grid

    this.#draw()
  }

  #draw ()
  {
    const gridImage = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(0)
      .setScale(.32)

    this.add([gridImage])

    const tilesGame = []

    for (let y = 0; y < this.grid.w; y++)
    {
      for (let x = 0; x < this.grid.h; x++)
      {
        const gameTile = this.scene.add.tileItem(0, 0)

        gameTile
          .setX(gameTile.displayWidth * x)
          .setY(gameTile.displayHeight * y)
          .on('pointerdown', (tile) =>
          {
            this.emit('pointerdown', tile)
          })
        
        tilesGame.push(gameTile)
      }
    }

    const containerTiles = this.scene.add.container(16, 13, tilesGame)

    this.add(containerTiles)
  }

}
