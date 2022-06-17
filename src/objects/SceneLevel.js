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

    this.padding = 20
    this.bonusesBlocks = {}

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

    this.grid.update()
  }

  audioManage ()
  {
    this.musicMain = this.sound.add('main-music', { volume: 0.4, loop: true })
      .play()

    this.tileClickSound = this.sound.add('tile-click', { volume: .8 })
  }

  draw ()
  {
    const { width } = this.game.scale

    this.containerRight = this.add.container(width / 2 + 150, 0)

    this.#drawTopBar()
    this.#drawGrid()
    this.#drawScoreBar()
    this.#drawBonuses()
  }

  #drawTopBar ()
  {
    const { width } = this.game.scale
    this.topBar = this.add.topBar(width / 2, 0)

    this.containerRight.setY(this.topBar.displayHeight + this.padding)
  }

  #drawGrid ()
  {
    const { width } = this.game.scale
    const x = 0
    const y = this.topBar.displayHeight + this.padding

    this.grid = this.add.gridTiles(x, y, this.gridTilesParams)
      .on('clickOnTile', (...args) => this.clickOnTile(...args))

    this.grid.setX(width / 2 - (this.grid.displayWidth - 6))
  }

  #drawScoreBar ()
  {
    const x = 0
    const y = 50

    this.scoreBar = this.add.scoreBar(x, y)
    this.containerRight.add(this.scoreBar)
      .setSize(this.scoreBar.displayWidth, this.scoreBar.displayHeight * 2)
  }

  #drawBonuses ()
  {
    const title = 'Bonuses:'
    const bonuses = this.bonusesService.getBonusesList()

    if (!bonuses.length) return

    const { fontFamily, colorTextBar } = this.configGame
    const yTitle = this.scoreBar.displayHeight + this.padding + 40
    const width = this.containerRight.displayWidth
    console.log(width);
    
    const styleText = {
      fontFamily,
      fontSize: 24,
      textAlign: 'center',
      color: colorTextBar,
    }

    this.textTitle = this.add.text(width / 2, yTitle, title, styleText)
      .setOrigin(.5, 0)

    const yBonus = yTitle + this.textTitle.displayHeight + this.padding

    bonuses.forEach((bonus, i) =>
      {
        this.bonusesBlocks[bonus.name] = this.add.bonusBlock(0, yBonus, bonus)
        const x = this.bonusesBlocks[bonus.name].displayWidth * i
        this.bonusesBlocks[bonus.name].setX(x)
      })

    this.containerRight.add([this.textTitle, ...Object.values(this.bonusesBlocks)])
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

    this.bonusesService.reset()

    this.scene.stop()
  }

}
