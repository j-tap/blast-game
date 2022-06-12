import SceneGame from '@/objects/SceneGame'

export default class SceneDefeat extends SceneGame
{
  constructor ()
  {
    super('SceneDefeat')
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

    this.drawTitle('Defeat')

    this.add.btn(centerX, centerY + 80, 'Again', () =>
      {
        this.scene.start('Scene1')
      })
      .setScale(.35)
  }

  playSound ()
  {
    this.game.sound.stopAll()
    this.sound.add('defeat-sound', { volume: .6 })
      .play()
  }

}
