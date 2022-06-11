import { Scene } from 'phaser'

import redBtn from '@/assets/img/game/red-btn.png'

export default class SceneBoot extends Scene
{
  constructor ()
  {
    super('SceneBoot')
  }

  preload ()
  {
    this.load.image('red-btn', redBtn)
  }

  create ()
  {
    const { centerX, centerY } = this.cameras.main

    this.add.btn(centerX, centerY, 'Start', () =>
    {
      this.scene.start('ScenePreload')
    })

  }
}
