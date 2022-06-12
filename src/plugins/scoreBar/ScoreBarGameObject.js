import { GameObjects } from 'phaser'

export default class ScoreBarGameObject extends GameObjects.Container
{
  constructor(scene, options = {})
  {
    super(scene, 0, 160)

    this.options = options
    this.imageBg = 'score-bg'

    this.#draw()
  }

  #draw ()
  {
    const { width } = this.scene.cameras.main
    const fontFamily = 'Marvin'
    const color = '#ffffff'

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
      .setX(width - scoreImage.displayWidth - 20)
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
