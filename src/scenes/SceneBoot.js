import SceneGame from '@/objects/SceneGame'

import redBtn from '@/assets/img/game/red-btn.png'
import progressSpr from '@/assets/img/game/progress-spr.png'
import progressJson from '@/assets/img/game/progress_atlas.json'

export default class SceneBoot extends SceneGame
{
  constructor ()
  {
    super('SceneBoot')
  }

  preload ()
  {
    super.preload()

    this.load.image('red-btn', redBtn)
    this.load.atlas('progress-spr', progressSpr, progressJson)
  }

  create ()
  {
    super.create()

    const { centerX, centerY } = this.cameras.main

    this.add.btn(centerX, centerY, 'Start', () =>
      {
        this.scene.start('ScenePreload')
      })
      .setScale(.6)

  }
}
