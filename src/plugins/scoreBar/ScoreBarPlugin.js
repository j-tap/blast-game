import { Plugins } from 'phaser'
import ScoreBarGameObject from './ScoreBarGameObject'

export default class ScoreBarPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('scoreBar', this.create)
  }

  create (options)
  {
    return this.displayList.add(new ScoreBarGameObject(this.scene, options))
  }
}
