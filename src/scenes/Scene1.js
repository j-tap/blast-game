import { Scene } from 'phaser'

export default class Scene1 extends Scene
{
  constructor ()
  {
    super('Scene1')
  }

  preload ()
  {
    
  }

  create ()
  {
    const mainMusic = this.sound.add('main-music', { volume: 0.4, loop: true })
    mainMusic.play()

    this.add.text(32, 32, 'Test', { fontFamily: 'Marvin', fontSize: 30, color: '#ff0000' })
    console.log('create');
  }

  update ()
  {
    console.log('update');
  }
}
