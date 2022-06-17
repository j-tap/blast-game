import AppGame from '@/objects/AppGame'
 
import configPhaser from '@/configs/phaser'

import BtnPlugin from '@/plugins/btn/BtnPlugin'
import ProgressLoaderPlugin from '@/plugins/progressLoader/ProgressLoaderPlugin'
import GridTilesPlugin from '@/plugins/gridTiles/GridTilesPlugin'
import TileItemPlugin from '@/plugins/tileItem/TileItemPlugin'
import ScoreBarPlugin from '@/plugins/scoreBar/ScoreBarPlugin'
import TopBarPlugin from '@/plugins/topBar/TopBarPlugin'
import BonusBlockPlugin from '@/plugins/bonusBlock/BonusBlockPlugin'

import SceneBoot from '@/scenes/SceneBoot'
import ScenePreload from '@/scenes/ScenePreload'
import SceneNextLevel from '@/scenes/SceneNextLevel'
import SceneWin from '@/scenes/SceneWin'
import SceneDefeat from '@/scenes/SceneDefeat'
import Scene1 from '@/scenes/Scene1'
import Scene2 from '@/scenes/Scene2'

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
      { key: 'BonusBlockPlugin', plugin: BonusBlockPlugin, start: true },
    ],
  },
  scene: [
    SceneBoot,
    ScenePreload,
    SceneNextLevel,
    SceneWin,
    SceneDefeat,
    Scene1,
    Scene2,
  ],
}

window.addEventListener('load', () =>
{
  const game = new AppGame(config)

  window.addEventListener('resize', () =>
  {
    game.resize()
  })

  game.resize()
})
