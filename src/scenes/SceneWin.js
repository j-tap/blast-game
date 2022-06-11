import { Scene, Math } from 'phaser'

import particlesSpr from '@/assets/img/scenes/scene-win/particles-spr.png'
import particlesJson from '@/assets/img/scenes/scene-win/particles_atlas.json'
import winSound from '@/assets/sounds/scenes/scene-win/win-sound.mp3'

export default class SceneWin extends Scene
{
  firework = {
    emiter: null,
  }

  constructor ()
  {
    super('SceneWin')
  }

  preload ()
  {
    this.load.atlas('particles-spr', particlesSpr, particlesJson)
    this.load.audio('win-sound', [winSound])
  }

  create ()
  {
    this.audioManage()
    this.drawTitle('Victory!')
    this.initFirework()
  }

  initFirework ()
  {
    this.firework.emiter = this.add.particles('particles-spr')
      .createEmitter({
        frame: [ 'particle-1', 'particle-2', 'particle-3' ],
        speed: { min: -100, max: 600 },
        angle: { min: 0, max: 360 },
        scale: { start: .1, end: 0 },
        blendMode: 'SCREEN',
        active: false,
        lifespan: 1000,
        gravityY: 200,
        alpha: { start: 1, end: .1 }
      })

    this.time.addEvent({
      delay: Math.Between(50, 150),
      callback: this.runFireworks,
      callbackScope: this,
      repeat: 5,
    })
  }

  runFireworks ()
  {
    const { centerX, centerY, width } = this.cameras.main
    const x = Math.Between(centerX / 2, width / 1.5)
    const y = Math.Between(centerY / 3, centerY / 1.2)

    this.firework.emiter.active = true
    this.firework.emiter.explode(30, x, y)
  }

  audioManage ()
  {
    this.game.sound.stopAll()
    this.sound.add('win-sound', { volume: .6 })
      .play()
  }

  drawTitle (text)
  {
    const { centerX, centerY } = this.cameras.main
    const styleTitle = {
      fontFamily: 'Marvin',
      fontSize: 36,
      textAlign: 'center',
      color: '#ffffff',
    }

    this.add.text(centerX, centerY, text, styleTitle)
      .setOrigin(0.5)
  }
}
