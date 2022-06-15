import bonusModel from '@/models/BonusModel'

export default class Bonus
{
  #params

  constructor ({ name, title, amount, params })
  {
    Object.assign(this, bonusModel)
    this.model = bonusModel
    this.name = name
    this.title = title
    this.amount = amount
    this.amountLeft = this.amount
    this.#params = params
    this.active = false
  }

  get canAvailable ()
  {
    return this.amountLeft > 0
  }

  #amountDown ()
  {
    this.amountLeft = Math.max(this.amountLeft - 1, 0)
    return this
  }

  activate (value = true)
  {
    if (this.canAvailable)
    {
      this.active = value
    }
    return this
  }

  accept ()
  {
    if (this.active)
    {
      this.#amountDown()
      this.active = false
      const params = this.#params
      return { ...this, params }
    }
    return this
  }
}
