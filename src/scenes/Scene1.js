import SceneGame from '@/objects/SceneGame'
import { scene1Config } from '@/configs/scenes'

export default class Scene1 extends SceneGame
{
  constructor ()
  {
    super('Scene1')

    const { maxMoves, minScore, minSimilarTiles, grid, tiles } = scene1Config

    this.maxMovesCount = maxMoves
    this.targetScoresCount = minScore

    this.scoresCount = 0
    this.movesCount = this.maxMovesCount

    this.gridTilesParams = {
      grid,
      tiles,
      minSimilarTiles,
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
      .on('clickOnTile', (tile) => this.clickOnTile(tile))

    this.scoreBar = this.add.scoreBar()
    this.topBar = this.add.topBar()
  }

  resetScore

  clickOnTile ({ isCondition, tilesSimilar })
  {
    if (isCondition)
    {
      this.tileClickSound.play()
      const tilesCount = tilesSimilar.length
      const score = this.scoresCount + tilesCount * tilesCount

      this.updateScoreAndMove(this.movesCount - 1, score)

      const progress = Math.min(this.scoresCount / this.targetScoresCount, this.targetScoresCount)
      this.topBar.updateProgress(progress)
      // this.cameras.main.shake(150, 0.008)
    }

    if (this.scoresCount >= this.targetScoresCount)
    {
      this.resetScoreAndMove()
      this.endWin()
    }
    else if (this.movesCount <= 0)
    {
      this.resetScoreAndMove()
      this.endDefeat()
    }
  }

  updateScoreAndMove (move = this.maxMovesCount, score = 0)
  {
    this.movesCount = move
    this.scoresCount = score
  }

  resetScoreAndMove ()
  {
    this.updateScoreAndMove()
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
