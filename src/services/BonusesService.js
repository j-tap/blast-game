import Bonus from '@/models/Bonus'

export default class BonusesService
{
  #bonuses

  constructor ({ bonuses = [] })
  {
    this.#bonuses = {}

    bonuses.forEach(bonus =>
      {
        this.#bonuses[bonus.name] = new Bonus(bonus)
      })
  }

  getBonuses ()
  {
    return this.#bonuses
  }

  getBonusesList ()
  {
    return Object.values(this.#bonuses)
  }

  getBonus (name)
  {
    return this.#bonuses[name]
  }

  getActive ()
  {
    return this.getBonusesList()
      .find(o => o.active)
      ?.name
  }

  setActive (name)
  {
    this.getBonusesList()
      .map(o => o.activate(o.name === name))
    return this
  }

  reset()
  {
    this.getBonusesList()
      .find(o => o.reset())
    return this
  }
}
