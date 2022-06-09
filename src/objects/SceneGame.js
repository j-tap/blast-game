import { Scene } from 'phaser'

export default class SceneGame extends Scene
{
  constructor ()
  {
    super('SceneGame')
  }

  preload ()
  {
    this.load.setPath('assets/img/game/')
    this.load.image('top-bar', 'top-bar-bg.png')
    console.log('preload main');
  }

  create ()
  {
    console.log('create main');
    this.scene.start('World')
  }

  update ()
  {
    console.log('update main');
  }
}
