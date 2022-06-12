import { Plugins } from 'phaser'
import ProgressLoaderGameObject from './ProgressLoaderGameObject'

export default class ProgressLoaderPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('progressLoader', this.create)
  }

  create (x, y, options)
  {
    return this.displayList.add(new ProgressLoaderGameObject(this.scene, x, y, options))
  }
}
