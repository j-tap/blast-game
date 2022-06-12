import SceneGame from '@/objects/SceneGame'
import { scene1Config } from '@/configs/scenes'

import Tile from '@/objects/Tile'

export default class Scene1 extends SceneGame
{
  constructor ()
  {
    super('Scene1')

    this.config = scene1Config
    this.movesCount = this.config.maxMoves
    this.scoresCount = 0
    this.targetScoresCount = this.config.minScore
    this.gridTilesParams = {
      grid: this.config.grid,
    }
  }

  create ()
  {
    super.create()

    this.audioManage()
    this.draw()
  }

  update ()
  {
    super.update()

    this.scoreBar.updateMove(this.movesCount)
    this.scoreBar.updateScore(this.scoresCount)
  }

  audioManage ()
  {
    this.musicMain = this.sound.add('main-music', { volume: 0.4, loop: true })
      .play()

    this.tileClickSound = this.sound.add('tile-click', { volume: .8 })
  }

  draw ()
  {
    this.grid = this.add.gridTiles(this.gridTilesParams)
      .on('pointerdown', (tile) => this.clicOnGridTile(tile))

    this.scoreBar = this.add.scoreBar()
    this.topBar = this.add.topBar()
  }

  clicOnGridTile (tile)
  {
    this.tileClickSound.play()
    this.movesCount--

    if (this.movesCount > 0)
    {
      const progress = this.scoresCount / this.targetScoresCount
      this.topBar.updateProgress(progress)
    }
    else {
      this.endWin()
    }
  }

  endDefeat ()
  {
    this.scene.start('SceneDefeat')
  }

  endWin ()
  {
    this.scene.start('SceneWin')
  }

}
