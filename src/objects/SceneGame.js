import { Scene } from 'phaser'

export default class SceneGame extends Scene
{
  static params = {
    colorBg: '#58c0f6',
    fontFamily: 'Marvin',
  }

  preload ()
  {
    this.cameras.main.setBackgroundColor(SceneGame.params.colorBg)
  }

  create ()
  {
    //
  }

  update ()
  {
    //
  }

  drawTitle (text)
  {
    const { centerX, centerY } = this.cameras.main
    const styleTitle = {
      fontFamily: SceneGame.params.fontFamily,
      fontSize: 50,
      textAlign: 'center',
      color: '#011b42',
    }

    this.add.text(centerX, centerY, text, styleTitle)
      .setOrigin(0.5)
  }
}
