export const scene1 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 150,
  minTilesTarget: 2,
  bonuses: [],
  autoShufl: 10,
  maxMoves: 10,
  nextScene: 'Scene2',
}

export const scene2 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 500,
  minTilesTarget: 2,
  bonuses: [
    {
      name: 'bomb',
      title: 'Bomb!',
      amount: 1,
      params: { range: 1 },
    },
  ],
  autoShufl: 10,
  maxMoves: 20,
  nextScene: 'SceneWin',
}
