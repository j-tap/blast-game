import { Game } from 'phaser'
 
import configPhaser from '@/configs/phaser'

import BtnPlugin from '@/plugins/btn/BtnPlugin'

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
      { key: 'BtnPlugin', plugin: BtnPlugin, start: true }
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

document.getElementById(configPhaser.parent).focus()
