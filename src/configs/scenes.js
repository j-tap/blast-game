export const scene1 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 70,
  minSimilarTiles: 2,
  autoShufl: 10,
  maxMoves: 5,
  nextScene: 'Scene2',
}

export const scene2 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 160,
  minSimilarTiles: 2,
  autoShufl: 10,
  maxMoves: 10,
  nextScene: 'SceneWin',
}
