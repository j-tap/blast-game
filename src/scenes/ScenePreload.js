import SceneGame from '@/objects/SceneGame'

import bonusBgImg from '@/assets/img/game/bonus-bg.png'
import gridBgImg from '@/assets/img/game/grid-bg.png'
import purpleBtnImg from '@/assets/img/game/purple-btn.png'
import redBtnImg from '@/assets/img/game/red-btn.png'
import scoreBgImg from '@/assets/img/game/score-bg.png'
import topBarBgImg from '@/assets/img/game/top-bar-bg.png'
import tilesSprImg from '@/assets/img/game/tiles-spr.png'
import tilesJson from '@/assets/img/game/tiles_atlas.json'
import tileClickSound from '@/assets/sounds/tile-click.mp3'
import mainMusicSound from '@/assets/sounds/musics/main-music.mp3'

import particlesSpr from '@/assets/img/scenes/scene-win/particles-spr.png'
import particlesJson from '@/assets/img/scenes/scene-win/particles_atlas.json'
import winSound from '@/assets/sounds/scenes/scene-win/win-sound.mp3'

import defeatSound from '@/assets/sounds/scenes/scene-defeat/defeat-sound.mp3'

export default class ScenePreload extends SceneGame
{
  constructor ()
  {
    super('ScenePreload')
    this.width = 600
  }

  preload ()
  {
    super.preload()

    this.preloaderDraw()

    this.load.image('bonus-bg', bonusBgImg)
    this.load.image('grid-bg', gridBgImg)
    this.load.image('purple-btn', purpleBtnImg)
    this.load.image('red-btn', redBtnImg)
    this.load.image('score-bg', scoreBgImg)
    this.load.image('top-bar-bg', topBarBgImg)

    this.load.atlas('tiles-spr', tilesSprImg, tilesJson)
    this.load.atlas('particles-spr', particlesSpr, particlesJson)
    
    this.load.audio('tile-click', [tileClickSound])
    this.load.audio('main-music', [mainMusicSound])
    this.load.audio('defeat-sound', [defeatSound])
    this.load.audio('win-sound', [winSound])
  }

  create ()
  {
    super.create()

    this.preloaderDestroy()
    this.scene.start('Scene1')
  }

  preloaderDraw ()
  {
    const { centerX, centerY } = this.cameras.main
    const { fontFamily, colorTextBar, colorTextTitle } = this.configGame

    this.preloader = this.add.container(centerX, centerY)

    const progressLoader = this.add.progressLoader(0, 0, {
        width: this.width,
      })
      .setName('progress')

    const loadingText = this.make.text({
      x: 0,
      y: -36,
      text: 'Loading...',
      style: {
        fontSize: 24,
        fontFamily,
        color: colorTextTitle,
      },
    })
      .setOrigin(.5, 0)

    const percentText = this.make.text({
      x: 0,
      y: 8,
      text: '0%',
      style: {
        fontSize: 18,
        fontFamily,
        color: colorTextBar,
      },
    })
      .setName('percentText')
      .setOrigin(.5, 0)

    this.preloader.add([progressLoader, loadingText, percentText])

    this.load.on('progress', (value) =>
    {
      this.preloaderUpdateData(value)
    })

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this)
  }

  preloaderDestroy ()
  {
    this.preloader.destroy()
  }

  preloaderUpdateData (value)
  {
    this.preloader.getByName('percentText')
      .setText(`${parseInt(value * 100)}%`)

    this.preloader.getByName('progress')
      .updateProgress(value)
  }

}
