import { Game } from 'phaser'

export default class AppGame extends Game
{
  constructor(config)
  {
    super(config)

    this.#initCustomParameters(config)
  }

  #initCustomParameters (config)
  {
    Object.keys(config).forEach(key =>
      {
        if (this.config[key] === undefined)
        {
          this.config[key] = config[key]
        }
      })
  }

  resize ()
  {
    const w = window.innerWidth
    const h = window.innerHeight

    const width = this.config.DEFAULT_WIDTH
    const height = this.config.DEFAULT_HEIGHT
    const maxWidth = this.config.MAX_WIDTH
    const maxHeight = this.config.MAX_HEIGHT
    const scaleMode = this.config.SCALE_MODE

    const scale = Math.min(w / width, h / height)
    const newWidth = Math.min(w / scale, maxWidth)
    const newHeight = Math.min(h / scale, maxHeight)

    const defaultRatio = width / height
    const maxRatioWidth = maxWidth / height
    const maxRatioHeight = width / maxHeight

    /* smooth scaling */
    let smooth = 1
    if (scaleMode === 'SMOOTH')
    {
      const maxSmoothScale = 1.15
      const getValuePercentFromRange = (value, min, max) =>
      {
        return (value - min) / (max - min)
      }
      if (width / height < w / h)
      {
        smooth =
          -getValuePercentFromRange(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
      } else {
        smooth =
          -getValuePercentFromRange(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
      }
    }

    /* resize the game */
    this.scale.resize(newWidth * smooth, newHeight * smooth)

    /* scale the width and height of the css */
    this.canvas.style.width = newWidth * scale + 'px'
    this.canvas.style.height = newHeight * scale + 'px'

    /* center the game with css margin */
    this.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
    this.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
  }
}
