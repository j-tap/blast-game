import { Scene, Math } from 'phaser'

import gameConfig from '@/configs/game'
import { scene1Config } from '@/configs/scenes'

import Tile from '@/objects/Tile'

export default class Scene1 extends Scene
{
  constructor ()
  {
    super('Scene1')
  }

  preload ()
  {
    //
  }

  create ()
  {
    this.audioManage()

    const { width, centerX } = this.cameras.main

    this.topBar = this.add.container(centerX, 0)
    this.grid = this.add.container(20, 120)
    this.scoreBar = this.add.container(0, 160)

    const gridImage = this.add.image(0, 0, 'grid-bg')
      .setOrigin(0)
      .setScale(.32)

    const topBarImage = this.add.image(0, 0, 'top-bar-bg')
      .setOrigin(.5, 0)
      .setScale(.32)

    const topBarProgressText = this.make.text({
        x: 0,
        y: 6,
        text: 'Progress',
        style: {
          fontSize: 16,
          fontFamily: 'Marvin',
          color: '#ffffff',
        },
      })
      .setOrigin(.8, 0)

    const progressBar = this.add.image(0, 30, 'progress-bar')
      .setOrigin(.58, 0)
      .setScale(.32)

    const scoreImage = this.add.image(0, 0, 'score-bg')
      .setOrigin(0, 0)
      .setScale(.32)

    const movesText = this.make.text({
        x: scoreImage.displayWidth / 2,
        y: 50,
        text: '15',
        style: {
          fontSize: 80,
          fontFamily: 'Marvin',
          color: '#ffffff',
        },
      })
      .setOrigin(.5, 0)

    const scoreTitleText = this.make.text({
        x: scoreImage.displayWidth / 2,
        y: 215,
        text: 'Score:',
        style: {
          fontSize: 24,
          fontFamily: 'Marvin',
          color: '#ffffff',
        },
      })
      .setOrigin(.5, 0)

    const scoreNumText = this.make.text({
        x: scoreImage.displayWidth / 2,
        y: 245,
        text: '150',
        style: {
          fontSize: 36,
          fontFamily: 'Marvin',
          color: '#ffffff',
        },
      })
      .setOrigin(.5, 0)

    this.topBar.add([topBarImage, topBarProgressText, progressBar])
    this.grid.add(gridImage)
    this.scoreBar.add([scoreImage, movesText, scoreTitleText, scoreNumText])
      .setX(width - scoreImage.displayWidth - 20)

    this.initGrid()

    this.input.on('pointerdown', () =>
    {
      // this.initGrid()
      // this.scene.start('SceneWin')
    })

  }

  update ()
  {
    //
  }

  audioManage ()
  {
    this.sound.add('main-music', { volume: 0.4, loop: true })
      .play()

    this.tileClickSound = this.sound.add('tile-click', { volume: .8 })
  }

  initGrid ()
  {
    const tilesAtlas = this.textures.get('tiles-spr')
    const tilesNames =  tilesAtlas.getFrameNames()
    const tilesGame = []

    for (let y = 0; y < gameConfig.area.x; y++)
    {
      for (let x = 0; x < gameConfig.area.y; x++)
      {
        const n = Math.Between(1, gameConfig.colorsCount)
        const tileName = tilesNames[n]
        const tile = tilesAtlas.frames[tileName]

        const gameTile = this.add.image(0, 0, 'tiles-spr', tileName)
          .setOrigin(0)
          .setScale(.32)

        gameTile
          .setX(gameTile.displayWidth * x)
          .setY(gameTile.displayHeight * y)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () =>
          {
            this.tileClickSound.play()
          })
        
        tilesGame.push(gameTile)
      }
    }

    const containerTiles = this.add.container(16, 13, tilesGame)
    this.grid.add(containerTiles)
  }
}
