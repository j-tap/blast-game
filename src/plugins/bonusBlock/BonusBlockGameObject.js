import { GameObjects } from 'phaser'

export default class BonusBlockGameObject extends GameObjects.Container
{
  constructor(scene, x, y, bonus)
  {
    super(scene, x, y)

    this.imageSpr = 'bonus-bg'
    this.bonus = bonus

    this.#draw()
  }

  #draw ()
  {
    const { fontFamily, colorTextBar } = this.scene.configGame
    const styleText = {
      fontFamily,
      fontSize: 24,
      textAlign: 'center',
      color: colorTextBar,
    }

    this.imageBg = this.scene.add.image(0, 0, this.imageSpr)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.onClickBonus, this)
      .setOrigin(0)
      .setScale(.32)

    const titleText = this.scene.make.text({
        x: this.imageBg.displayWidth / 2,
        y: this.imageBg.displayHeight / 4,
        text: this.bonus.title,
        style: styleText,
      })
      .setOrigin(.5, 0)

    this.amountText = this.scene.make.text({
        x: this.imageBg.displayWidth / 2,
        y: this.imageBg.displayHeight - 55,
        text: '',
        style: { ...styleText, fontSize: 18 },
      })
      .setName('amountText')
      .setOrigin(.5, 0)

    this.add([this.imageBg, titleText, this.amountText])
    this.setSize(this.imageBg.displayWidth, this.imageBg.displayHeight)
  }

  onClickBonus ()
  {
    if (this.bonus.canAvailable)
    {
      this.bonus.activate(!this.bonus.active)
    }
  }

  update (bonus)
  {
    this.bonus = bonus

    this.amountText.setText(`${this.bonus.amountLeft}/${this.bonus.amount}`)

    if (this.bonus.canAvailable) this.setAlpha(1)
    else this.setAlpha(.5)

    if (this.bonus.active) this.imageBg.setTint(0xD50053)
    else this.imageBg.clearTint()
  }
}
