import { Scene } from 'phaser'

import faviconImg from '@/assets/img/app/favicon.png'

export default class SceneBoot extends Scene
{
  constructor ()
  {
    super('SceneBoot')
  }

  preload ()
  {
    this.load.image('logo', faviconImg)
    this.make.text({
      x: 0,
      y: 0,
      text: '',
      style: {
        font: '0px Marvin',
      },
    })
  }

  create ()
  {
    this.scene.start('ScenePreload')
  }
}
