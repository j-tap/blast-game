export const scene1 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 150,
  minSimilarTiles: 2,
  autoShufl: 10,
  maxMoves: 7,
  nextScene: 'Scene2',
}

export const scene2 = {
  grid: {
    w: 9,
    h: 9,
  },
  tiles: ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'],
  minScore: 500,
  minSimilarTiles: 2,
  autoShufl: 10,
  maxMoves: 14,
  nextScene: 'SceneWin',
}
