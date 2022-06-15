import { Scene } from 'phaser'

import configGame from '@/configs/game'
import GameService from '@/services/GameService'
import ScoresService from '@/services/ScoresService'

export default class SceneGame extends Scene
{
  preload ()
  {
    this.configGame = configGame
    this.cameras.main.setBackgroundColor(this.configGame.colorBg)
  }

  create ()
  {
    this.gameService = new GameService()
    this.scoresService = new ScoresService()
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
