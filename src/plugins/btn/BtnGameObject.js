import { GameObjects } from 'phaser'

export default class BtnGameObject extends GameObjects.Container
{
  constructor(scene, x, y, text, action)
  {
    super(scene, 'btn')

    this.scene = scene
    this.x = x
    this.y = y

    const btnImage = this.scene.add.image(0, 0, 'red-btn')
      .setInteractive({ useHandCursor: true })

    const btnText = this.scene.add.text(btnImage.centerX, btnImage.centerY, text, {
        fontFamily: 'Marvin',
        fontSize: 70,
        textAlign: 'center',
      })
      .setOrigin(.5)

    btnImage.on('pointerdown', () =>
    {
      action()
    })

    this.add([btnImage, btnText])

  }
}
