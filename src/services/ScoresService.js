export default class ScoresService
{
  constructor ()
  {
    this.movesLimit = 0
    this.scoresTarget = 0
    this.moves = 0
    this.scores = 0
  }

  #calcScores (value)
  {
    const factor = value
    const maxShare = 3
    return Math.floor(Math.min(value * factor, this.scoresTarget / maxShare))
  }

  get progress ()
  {
    const v = this.scoresTarget
    return Math.min(this.scores / v, v)
  }

  init ({ scoresTarget, movesLimit })
  {
    this.scoresTarget = scoresTarget
    this.movesLimit = movesLimit
    this.moves = this.movesLimit
  }

  addScores (value = 0)
  {
    this.scores += this.#calcScores(value)
    return this
  }

  resetScores ()
  {
    this.scores = 0
    return this
  }

  movesDown ()
  {
    this.moves = Math.max(this.moves - 1, 0)
    return this
  }

  resetMoves ()
  {
    this.moves = this.movesLimit
    return this
  }
}
