import SceneGame from '@/objects/SceneGame'

import * as scenesConfig from '@/configs/scenes'

export default class SceneLevel extends SceneGame
{
  scenesConfig = scenesConfig

  setParamsScene ({ maxMoves, minScore, minSimilarTiles, grid, tiles, nextScene })
  {
    this.maxMovesCount = maxMoves
    this.targetScoresCount = minScore
    this.nextScene = nextScene

    this.scoresCount = 0
    this.movesCount = this.maxMovesCount

    this.gridTilesParams = {
      grid,
      tiles,
      minSimilarTiles,
    }
  }

  preload ()
  {
    super.preload()
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

    this.grid.gridUpdate()
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

  clickOnTile ({ tile, isCondition, tilesSimilar })
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
      this.nextLevel()
    }
    else if (this.movesCount <= 0)
    {
      this.endDefeat()
    }
  }

  resetScoreAndMove ()
  {
    this.updateScoreAndMove()
  }

  updateScoreAndMove (move = this.maxMovesCount, score = 0)
  {
    this.movesCount = move
    this.scoresCount = score
  }

  endDefeat ()
  {
    this.stopScene()
    this.scene.start('SceneDefeat', { nextScene: this.scene.key })
  }

  nextLevel ()
  {
    const scoreOnLevel = this.scoresCount
    this.stopScene()

    if (this.nextScene === 'SceneWin')
    {
      this.scene.start(this.nextScene)
    }
    else {
      this.scene.start('SceneNextLevel', { scoreOnLevel, nextScene: this.nextScene })
    }
  }

  stopScene ()
  {
    this.resetScoreAndMove()
    this.scene.stop()
  }

}
