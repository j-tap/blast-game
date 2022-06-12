import { GameObjects } from 'phaser'

export default class ProgressLoaderGameObject extends GameObjects.Container
{
  barObject
  progressObject

  constructor(scene, x, y, options)
  {
    super(scene, x, y)

    this.options = options
    this.width = this.options.width || 400
    this.height = 102
    this.padding = {
      x: 5,
      y: 5,
    }
    this.atlasName = 'progress-spr'

    this.#draw()
  }

  #draw ()
  {
    this.#drawBar()
    this.#drawProgress()

    this.add([this.barObject, this.progressObject])
    this.setScale(.4)
  }

  #drawBar ()
  {
    const width = this.width
    const barLeft = this.scene.add.image(0, 0, this.atlasName, 'bar-left')
      .setOrigin(0)

    const widthMiddle = width - barLeft.displayWidth * 2
    const barMiddleX = barLeft.x + barLeft.displayWidth
    const barMiddle = this.scene.add.tileSprite(barMiddleX, 0, widthMiddle, this.height, this.atlasName, 'bar-middle')
      .setOrigin(0)

    const barRightX = barMiddle.x + barMiddle.displayWidth
    const barRight = this.scene.add.image(barRightX, 0, this.atlasName, 'bar-right')
      .setOrigin(0)

    this.barObject = this.scene.add.container(-(width / 2), 0, [barLeft, barMiddle, barRight])
  }

  #drawProgress ()
  {
    const height = 86
    const width = this.width - this.padding.x * 2
    const progressLeft = this.scene.add.image(0, 0, this.atlasName, 'progress-left')
      .setOrigin(0)
      .setName('progressStart')
      .setVisible(false)

    this.widthProgressMiddle = width - progressLeft.displayWidth * 2
    const progressMiddleX = progressLeft.x + progressLeft.displayWidth
    const progressMiddle = this.scene.add.tileSprite(progressMiddleX, 0, 0, height, this.atlasName, 'progress-middle') 
      .setOrigin(0)
      .setVisible(false)
      .setName('progress')

    const progressRight = this.scene.add.image(0, 0, this.atlasName, 'progress-right')
      .setOrigin(0)
      .setVisible(false)
      .setName('progressEnd')

    this.widthProgressCap = progressRight.displayWidth

    this.progressObject = this.scene.add.container(-(width / 2), this.padding.y, [
        progressLeft, progressMiddle, progressRight
      ])
  }

  updateProgress (value = 0)
  {
    const progress = this.progressObject.getByName('progress')

    if (value > 0)
    {
      this.progressObject.getByName('progressStart')
        .setVisible(true)

      progress.setVisible(true)
    }

    this.scene.tweens.add({
      targets: progress,
      width: this.widthProgressMiddle * value,
      onComplete: () =>
      {
        if (value === 1)
        {
          const progressEnd = this.progressObject.getByName('progressEnd')
            .setX(progress.x + progress.displayWidth)
            .setVisible(true)

          this.scene.tweens.add({
            targets: progressEnd,
            width: this.widthProgressCap,
          })
        }
      }
    })
  }
}
