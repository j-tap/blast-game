import { GameObjects } from 'phaser'

export default class BtnGameObject extends GameObjects.Container
{
  constructor(scene, x, y, text, action)
  {
    super(scene, x, y)

    const { fontFamily, colorTextBtn } = this.scene.configGame

    this.imageSpr = 'red-btn'
    this.text = text
    this.action = action
    this.styleText = {
      fontFamily,
      fontSize: 70,
      textAlign: 'center',
      color: colorTextBtn,
    }

    this.#draw()
  }

  #draw ()
  {
    const btnImage = this.scene.add.image(0, 0, this.imageSpr)
      .setInteractive({ useHandCursor: true })

    const btnText = this.scene.add.text(btnImage.centerX, btnImage.centerY, this.text, this.styleText)
      .setOrigin(.5)

    btnImage.on('pointerdown', () =>
    {
      this.action()
    })

    this.add([btnImage, btnText])
  }
}
