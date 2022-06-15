import { GameObjects } from 'phaser'

export default class ScoreBarGameObject extends GameObjects.Container
{
  constructor(scene, x, y, options = {})
  {
    super(scene, x, y)

    this.options = options
    this.imageBg = 'score-bg'

    this.#draw()
  }

  #draw ()
  {
    const { fontFamily, colorTextBar } = this.scene.configGame
    const color = colorTextBar

    const scoreImage = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(0, 0)
      .setScale(.32)

    const movesText = this.scene.make.text({
        x: scoreImage.displayWidth / 2,
        y: 50,
        style: {
          fontSize: 80,
          fontFamily,
          color,
        },
      })
      .setName('movesText')
      .setOrigin(.5, 0)

    const scoreTitleText = this.scene.make.text({
        x: scoreImage.displayWidth / 2,
        y: 215,
        text: 'Score:',
        style: {
          fontSize: 24,
          fontFamily,
          color,
        },
      })
      .setOrigin(.5, 0)

    const scoreNumText = this.scene.make.text({
        x: scoreImage.displayWidth / 2,
        y: 245,
        text: '150',
        style: {
          fontSize: 36,
          fontFamily,
          color,
        },
      })
      .setName('scoresNumText')
      .setOrigin(.5, 0)

    this.add([scoreImage, movesText, scoreTitleText, scoreNumText])
    this.setSize(scoreImage.displayWidth, scoreImage.displayHeight)
  }

  updateMove (value)
  {
    this.getByName('movesText')
      .setText(`${value}`)
  }

  updateScore (value)
  {
    this.getByName('scoresNumText')
      .setText(`${value}`)
  }
}
