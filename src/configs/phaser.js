const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT= 800
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const SCALE_MODE = 'FIT' /* (FIT, SMOOTH) */

export default {
  /* custom properties */
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  MAX_WIDTH,
  MAX_HEIGHT,
  SCALE_MODE,
  
  orientation: 'landscape',
  styles: {
    colorText: 0x222222,
    fontSize: 18,
    fontSizeH3: 24
  },

  /* phaser properties */
  disableContextMenu: true,
  autoFocus: true,
  pixelArt: false,
  antialias: true,
  transparent: false,
  parent: 'game',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scale: {
    mode: 0, /* 0 - NONE */
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
}
