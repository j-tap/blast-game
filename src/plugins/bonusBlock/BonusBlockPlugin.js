import { Plugins } from 'phaser'
import BonusBlockGameObject from './BonusBlockGameObject'

export default class BonusBlockPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('bonusBlock', this.create)
  }

  create (x, y, options)
  {
    return this.displayList.add(new BonusBlockGameObject(this.scene, x, y, options))
  }
}
