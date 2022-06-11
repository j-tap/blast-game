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
      width: 640,
      height: 480,
    },
    max: {
      width: 1980,
      height: 1200,
    },
  },
}
