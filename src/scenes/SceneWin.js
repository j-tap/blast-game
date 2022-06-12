import { Math } from 'phaser'

import SceneGame from '@/objects/SceneGame'
import Firework from '@/objects/Firework'

export default class SceneWin extends SceneGame
{
  constructor ()
  {
    super('SceneWin')
  }

  preload ()
  {
    super.preload()
  }

  create ()
  {
    super.create()

    const { centerX, centerY } = this.cameras.main

    this.playSound()

    this.drawTitle('Victory!')

    const firework = new Firework(this)
    firework.run(10)

    this.add.btn(centerX, centerY + 80, 'Again', () =>
      {
        this.scene.start('Scene1')
      })
      .setScale(.35)
  }

  playSound ()
  {
    this.game.sound.stopAll()
    this.sound.add('win-sound', { volume: .6 })
      .play()
  }
}
