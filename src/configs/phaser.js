export default {
  width: 800,
  height: 600,
  parent: 'game',
  transparent: true,
  type: 1, // Canvas
  // loaderPath: '../assets/img/game/',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
}
