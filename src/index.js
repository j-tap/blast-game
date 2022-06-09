import { Game } from 'phaser'
 
import configPhaser from '@/configs/phaser'

import SceneBoot from '@/scenes/SceneBoot'
import ScenePreload from '@/scenes/ScenePreload'
import Scene1 from '@/scenes/Scene1'

require('@/assets/styles/index.styl')

const config = {
  ...configPhaser,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: configPhaser.parent,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: configPhaser.width,
    height: configPhaser.height,
  },
  scene: [SceneBoot, ScenePreload, Scene1],
}

new Game(config)
