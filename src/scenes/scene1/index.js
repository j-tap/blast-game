export default class Scene1 extends Scene
{
  constructor ()
  {
    super('Scene1')
  }

  preload ()
  {
    this.load.setPath('assets/img/scenes/scene1/')
    // this.load.image('logo', 'icon.png')
  }

  create ()
  {
    console.log('create');
  }

  update ()
  {
    console.log('update');
  }
}
