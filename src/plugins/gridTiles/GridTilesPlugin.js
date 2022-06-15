import { Plugins } from 'phaser'
import GridTilesGameObject from './GridTilesGameObject'

export default class GridTilesPlugin extends Plugins.BasePlugin
{
  constructor (pluginManager)
  {
    super(pluginManager)
    pluginManager.registerGameObject('gridTiles', this.create)
  }

  create (x, y, options)
  {
    return this.displayList.add(new GridTilesGameObject(this.scene, x, y, options))
  }
}
