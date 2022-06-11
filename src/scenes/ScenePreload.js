import { Scene } from 'phaser'

import bonusBgImg from '@/assets/img/game/bonus-bg.png'
import gridBgImg from '@/assets/img/game/grid-bg.png'
import iconUnknowImg from '@/assets/img/game/icon-unknow.png'
import pauseBtnImg from '@/assets/img/game/pause-btn.png'
import plusBtnImg from '@/assets/img/game/plus-btn.png'
import progressBarImg from '@/assets/img/game/progress-bar.png'
import purpleBtnImg from '@/assets/img/game/purple-btn.png'
import redBtnImg from '@/assets/img/game/red-btn.png'
import scoreBgImg from '@/assets/img/game/score-bg.png'
import topBarBgImg from '@/assets/img/game/top-bar-bg.png'
import tilesSprImg from '@/assets/img/game/tiles-spr.png'
import tilesJson from '@/assets/img/game/tiles_atlas.json'
import tileClickSound from '@/assets/sounds/tile-click.mp3'
import mainMusicSound from '@/assets/sounds/musics/main-music.mp3'

export default class ScenePreload extends Scene
{
  preloader = {}

  constructor ()
  {
    super('ScenePreload')
  }

  preload ()
  {
    this.preloaderDraw()

    this.load.image('bonus-bg', bonusBgImg)
    this.load.image('grid-bg', gridBgImg)
    this.load.image('icon-unknow', iconUnknowImg)
    this.load.image('pause-btn', pauseBtnImg)
    this.load.image('plus-btn', plusBtnImg)
    this.load.image('progress-bar', progressBarImg)
    this.load.image('purple-btn', purpleBtnImg)
    this.load.image('red-btn', redBtnImg)
    this.load.image('score-bg', scoreBgImg)
    this.load.image('top-bar-bg', topBarBgImg)
    this.load.atlas('tiles-spr', tilesSprImg, tilesJson)
    this.load.audio('tile-click', [tileClickSound])
    this.load.audio('main-music', [mainMusicSound])
  }

  create ()
  {
    this.scene.start('Scene1')
  }

  preloaderDraw ()
  {
    const { width, height } = this.cameras.main

    this.preloader.bar = this.add.graphics()
    this.preloader.progress = this.add.graphics()

    this.preloader.bar.fillStyle(0x000000, .7)
    this.preloader.bar.fillRect(240, 270, 320, 50)
    
    this.preloader.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        fontSize: 24,
        fontFamily: 'Marvin',
        color: '#ffffff',
      },
    })
    this.preloader.loadingText.setOrigin(.5)

    this.preloader.percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        fontSize: 18,
        fontFamily: 'Marvin',
        color: '#ffffff',
      },
    })
    this.preloader.percentText.setOrigin(.5)

    this.load.on('progress', (value) =>
    {
      this.preloaderUpdateData(value)
    })

    this.load.on('complete', () =>
    {
      this.preloaderDestroy()
    })

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this)
  }

  preloaderDestroy ()
  {
    this.preloader.progress.destroy()
    this.preloader.bar.destroy()
    this.preloader.loadingText.destroy()
    this.preloader.percentText.destroy()
  }

  preloaderUpdateData (value)
  {
    this.preloader.percentText.setText(`${parseInt(value * 100)}%`)
    this.preloader.progress.clear()
    this.preloader.progress.fillStyle(0xffffff, .2)
    this.preloader.progress.fillRect(245, 275, 310 * value, 40)
  }

}
