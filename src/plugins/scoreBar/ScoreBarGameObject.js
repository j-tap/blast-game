import { GameObjects } from 'phaser'

export default class ScoreBarGameObject extends GameObjects.Container
{
  constructor(scene, x, y, options = {})
  {
    super(scene, x, y)

    this.options = options
    this.imageBgName = 'score-bg'

    this.#draw()
  }

  #draw ()
  {
    const { fontFamily, colorTextBar } = this.scene.configGame
    const color = colorTextBar

    this.imageBg = this.scene.add.image(0, 0, this.imageBgName)
      .setOrigin(0, 0)
      .setScale(.32)

    this.textMove = this.scene.make.text({
        x: this.imageBg.displayWidth / 2,
        y: 50,
        style: {
          fontSize: 80,
          fontFamily,
          color,
        },
      })
      .setName('textMove')
      .setOrigin(.5, 0)

    this.textTitle = this.scene.make.text({
        x: this.imageBg.displayWidth / 2,
        y: 215,
        text: 'Score:',
        style: {
          fontSize: 24,
          fontFamily,
          color,
        },
      })
      .setOrigin(.5, 0)

    this.textScoreNum = this.scene.make.text({
        x: this.imageBg.displayWidth / 2,
        y: 245,
        text: '150',
        style: {
          fontSize: 36,
          fontFamily,
          color,
        },
      })
      .setOrigin(.5, 0)

    this.add([this.imageBg, this.textMove, this.textTitle, this.textScoreNum])
    this.setSize(this.imageBg.displayWidth, this.imageBg.displayHeight)
  }

  updateMove (value)
  {
    this.textMove.setText(`${value}`)
  }

  updateScore (value)
  {
    this.textScoreNum.setText(`${value}`)
  }
}
