import { Scene } from 'phaser'

import configGame from '@/configs/game'

export default class SceneGame extends Scene
{
  preload ()
  {
    this.configGame = configGame
    this.cameras.main.setBackgroundColor(this.configGame.colorBg)
  }

  create ()
  {
    //
  }

  update ()
  {
    //
  }

  drawTitle (text, x = null, y = null)
  {
    const { centerX, centerY } = this.cameras.main
    const styleTitle = {
      fontFamily: this.configGame.fontFamily,
      fontSize: 50,
      textAlign: 'center',
      color: this.configGame.colorTextTitle,
    }

    this.add.text(x || centerX, y || centerY, text, styleTitle)
      .setOrigin(0.5)
  }
}
