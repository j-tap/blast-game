import { Plugins } from 'phaser'
import TileItemGameObject from './TileItemGameObject'

export default class TileItemPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('tileItem', this.create)
  }

  create (x, y, options)
  {
    return this.displayList.add(new TileItemGameObject(this.scene, x, y, options))
  }
}
