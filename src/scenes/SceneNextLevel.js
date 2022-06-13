import SceneGame from '@/objects/SceneGame'
import Firework from '@/objects/Firework'

export default class SceneNextLevel extends SceneGame
{
  constructor ()
  {
    super('SceneNextLevel')
  }

  init ({ scoreOnLevel, nextScene })
  {
    this.nextScene = nextScene
    this.scoreOnLevel = scoreOnLevel
  }

  preload ()
  {
    super.preload()
  }

  create ()
  {
    super.create()

    const { centerX, centerY } = this.cameras.main
    const { fontFamily, colorTextTitle } = this.configGame

    this.playSound()

    this.drawTitle('Next level', centerX, centerY - 50)

    const scoreText = `Points scored: ${this.scoreOnLevel}`
    const styleTitle = {
      fontFamily,
      fontSize: 18,
      textAlign: 'center',
      color: colorTextTitle,
    }

    this.add.text(centerX, centerY, scoreText, styleTitle)
      .setOrigin(0.5)

    this.add.btn(centerX, centerY + 80, 'Next', () =>
      {
        this.scene.start(this.nextScene)
      })
      .setScale(.35)
  }

  playSound ()
  {
    this.game.sound.stopAll()
  }
}
