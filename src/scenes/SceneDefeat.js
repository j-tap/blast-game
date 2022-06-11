import { Scene } from 'phaser'

import defeatSound from '@/assets/sounds/scenes/scene-defeat/defeat-sound.mp3'

export default class SceneDefeat extends Scene
{
  constructor ()
  {
    super('SceneDefeat')
  }

  preload ()
  {
    this.load.audio('defeat-sound', [defeatSound])
  }

  create ()
  {
    this.audioManage()
    this.drawTitle('Defeat')
  }

  audioManage ()
  {
    this.game.sound.stopAll()
    this.sound.add('defeat-sound', { volume: .6 })
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
