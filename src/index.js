import { Game } from 'phaser'
 
import configPhaser from '@/configs/phaser'

import BtnPlugin from '@/plugins/btn/BtnPlugin'
import ProgressLoaderPlugin from '@/plugins/progressLoader/ProgressLoaderPlugin'
import GridTilesPlugin from '@/plugins/gridTiles/GridTilesPlugin'
import TileItemPlugin from '@/plugins/tileItem/TileItemPlugin'
import ScoreBarPlugin from '@/plugins/scoreBar/ScoreBarPlugin'
import TopBarPlugin from '@/plugins/topBar/TopBarPlugin'

import SceneBoot from '@/scenes/SceneBoot'
import ScenePreload from '@/scenes/ScenePreload'
import SceneWin from '@/scenes/SceneWin'
import SceneDefeat from '@/scenes/SceneDefeat'
import Scene1 from '@/scenes/Scene1'

require('@/assets/styles/index.styl')

const config = {
  ...configPhaser,
  plugins: {
    global: [
      { key: 'BtnPlugin', plugin: BtnPlugin, start: true },
      { key: 'ProgressLoaderPlugin', plugin: ProgressLoaderPlugin, start: true },
      { key: 'GridTilesPlugin', plugin: GridTilesPlugin, start: true },
      { key: 'TileItemPlugin', plugin: TileItemPlugin, start: true },
      { key: 'ScoreBarPlugin', plugin: ScoreBarPlugin, start: true },
      { key: 'TopBarPlugin', plugin: TopBarPlugin, start: true },
    ],
  },
  scene: [
    SceneBoot,
    ScenePreload,
    SceneWin,
    SceneDefeat,
    Scene1,
  ],
}

new Game(config)
