import { GameObjects } from 'phaser'

export default class TopBarGameObject extends GameObjects.Container
{
  constructor(scene, x, y, options = {})
  {
    super(scene, x, y)

    this.options = options
    this.widthProgress = 1040
    this.imageBg = 'top-bar-bg'

    this.#draw()
  }

  #draw ()
  {
    const { fontFamily, colorTextBar } = this.scene.configGame

    const imagebg = this.scene.add.image(0, 0, this.imageBg)
      .setOrigin(.5, 0)
      .setScale(.32)

    const textTitle = this.scene.make.text({
        x: 0,
        y: 6,
        text: 'Progress',
        style: {
          fontSize: 16,
          fontFamily: fontFamily,
          color: colorTextBar,
        },
      })
      .setOrigin(.82, 0)

    this.progress = this.scene.add.progressLoader(-32, 35, {
        width: this.widthProgress,
      })

    this.add([imagebg, textTitle, this.progress])
    this.setSize(imagebg.displayWidth, imagebg.displayHeight)
  }

  updateProgress (value)
  {
    this.progress.updateProgress(value)
  }
}
