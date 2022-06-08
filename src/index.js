import { Game } from 'phaser'
 
import configPhaser from './configs/phaser'
import Scene1 from './scenes/scene1'
 
const config = {
  ...configPhaser,
  scene: [Scene1],
}

new Game(config)
