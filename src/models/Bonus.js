export default class Bonus
{
  #params

  constructor ({ name = null, title = null, amount = 0, params = {} })
  {
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

  reset ()
  {
    this.amountLeft = this.amount
    this.active = false
    return this
  }
}
