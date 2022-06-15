import { Plugins } from 'phaser'
import ScoreBarGameObject from './ScoreBarGameObject'

export default class ScoreBarPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('scoreBar', this.create)
  }

  create (x, y, options)
  {
    return this.displayList.add(new ScoreBarGameObject(this.scene, x, y, options))
  }
}
