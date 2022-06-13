export default {
  parent: 'game',
  transparent: true,
  antialias: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 320,
      height: 320,
    },
    max: {
      width: 1980,
      height: 1980,
    },
  },
}
