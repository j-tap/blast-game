import { Plugins } from 'phaser'
import TopBarGameObject from './TopBarGameObject'

export default class TopBarPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('topBar', this.create)
  }

  create (options)
  {
    return this.displayList.add(new TopBarGameObject(this.scene, options))
  }
}
