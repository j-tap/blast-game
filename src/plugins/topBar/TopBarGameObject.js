import { GameObjects } from 'phaser'

export default class TopBarGameObject extends GameObjects.Container
{
  constructor(scene, options = {})
  {
    super(scene, 0, 0)

    this.options = options
    this.widthProgress = 1040

    this.#draw()
  }

  #draw ()
  {
    const { centerX } = this.scene.cameras.main
    this.setX(centerX)

    const topBarImage = this.scene.add.image(0, 0, 'top-bar-bg')
      .setOrigin(.5, 0)
      .setScale(.32)

    const topBarProgressText = this.scene.make.text({
        x: 0,
        y: 6,
        text: 'Progress',
        style: {
          fontSize: 16,
          fontFamily: 'Marvin',
          color: '#ffffff',
        },
      })
      .setOrigin(.82, 0)

    this.progress = this.scene.add.progressLoader(-32, 35, {
        width: this.widthProgress,
      })

    this.add([topBarImage, topBarProgressText, this.progress])
  }

  updateProgress (value)
  {
    this.progress.updateProgress(value)
  }
}
