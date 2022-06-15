import SceneGame from '@/objects/SceneGame'

import * as scenesConfig from '@/configs/scenes'
import BonusesService from '@/services/BonusesService'

export default class SceneLevel extends SceneGame
{
  scenesConfig = scenesConfig

  setParamsScene ({ maxMoves, minScore, minTilesTarget, bonuses, grid, tiles, nextScene })
  {
    this.maxMovesCount = maxMoves
    this.targetScoresCount = minScore
    this.nextScene = nextScene

    this.gridTilesParams = {
      grid,
      tiles,
      minTilesTarget,
    }

    this.bonusesService = new BonusesService({ bonuses })
  }

  preload ()
  {
    super.preload()
  }

  create ()
  {
    super.create()

    this.scoresService.init({
      scoresTarget: this.targetScoresCount,
      movesLimit: this.maxMovesCount,
    })

    this.audioManage()
    this.draw()
  }

  update ()
  {
    super.update()

    this.scoreBar.updateMove(this.scoresService.moves)
    this.scoreBar.updateScore(this.scoresService.scores)

    Object.keys(this.bonusesBlocks).forEach(name =>
      {
        const bonus = this.bonusesService.getBonus(name)
        this.bonusesBlocks[name].update(bonus)
      })

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
    const { fontFamily, colorTextBar } = this.configGame
    const { width } = this.cameras.main
    this.bonusesBlocks = []
    const bonuses = this.bonusesService.getBonuses()
    const padding = 20
    const styleText = {
      fontFamily,
      fontSize: 24,
      textAlign: 'center',
      color: colorTextBar,
    }

    this.topBar = this.add.topBar()

    this.grid = this.add.gridTiles(padding, 120, this.gridTilesParams)
      .on('clickOnTile', (tile) => this.clickOnTile(tile))

    this.scoreBar = this.add.scoreBar(0, 160)
    this.scoreBar.setX(width - this.scoreBar.displayWidth - padding)

    if (Object.keys(bonuses).length)
    {
      this.add.text(
          width - this.scoreBar.displayWidth / 2 - padding,
          this.scoreBar.y + this.scoreBar.displayHeight + padding,
          'Bonuses:',
          styleText,
        )
        .setOrigin(.5, 0)
    }

    Object.keys(bonuses).forEach((name, i) =>
      {
        const y = this.scoreBar.y + this.scoreBar.displayHeight + 60
        this.bonusesBlocks[name] = this.add.bonusBlock(0, y, bonuses[name])
        const x = width - this.scoreBar.displayWidth - 70 + this.bonusesBlocks[name].displayWidth * i
        this.bonusesBlocks[name].setX(x)
      })
  }

  clickOnTile ({ isCondition, tilesTarget })
  {
    if (isCondition)
    {
      this.tileClickSound.play()

      this.scoresService
        .addScores(tilesTarget.length)
        .movesDown()

      const progress = this.scoresService.progress
      this.topBar.updateProgress(progress)
    }

    if (this.scoresService.scores >= this.scoresService.scoresTarget)
    {
      this.nextLevel()
    }
    else if (this.scoresService.moves <= 0)
    {
      this.endDefeat()
    }
  }

  endDefeat ()
  {
    this.stopScene()
    this.scene.start('SceneDefeat', { nextScene: this.scene.key })
  }

  nextLevel ()
  {
    const scoreOnLevel = this.scoresService.scores
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
    this.scoresService
      .resetScores()
      .resetMoves()

    this.scene.stop()
  }

}
