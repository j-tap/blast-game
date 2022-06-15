import Bonus from '@/objects/Bonus'

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

  getBonus (name)
  {
    return this.#bonuses[name]
  }

  getActive ()
  {
    const bonuses = this.getBonuses()
    return Object.keys(bonuses).find(n => bonuses[n].active)
  }

  setActive (name)
  {
    const bonuses = this.getBonuses()
    Object.keys(bonuses).find(n => bonuses[n].activate(n === name))
    return this
  }
}
