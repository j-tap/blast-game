import { GameObjects } from 'phaser'

export default class TileItemGameObject extends GameObjects.Image
{
  constructor(scene, { tile })
  {
    const key = 'tiles-spr'
    const {
      frame,
      type,
      color,
      colorName,
      name,
      empty,
      posOnGrid = { x: 0, y: 0 },
    } = tile

    super(scene, 0, 0, key, frame)

    this.type = type
    this.colorName = colorName
    this.color = color
    this.posOnGrid = {
      x: posOnGrid.x,
      y: posOnGrid.y,
    }
    this.name = name
    this.empty = empty
    this.defaultScale = .32

    this.tweens = {}
    this.particles = {}

    this.setOrigin(.5)
    this.setSize(170, 192)
    this.setScale(this.defaultScale)
    this.setInteractive({ useHandCursor: true })

    const coords = this.#calcCoords()

    this.setX(coords.x)

    this.on('pointerdown', this.#pointerdownHandler)

    this.#initTweens()
    this.#initEmitters()
  }

  #initTweens ()
  {
    this.tweens.positionTween = this.scene.tweens.add({
      y: this.y,
      targets: this,
      duration: 150,
      ease: 'Elastic',
      yoyo: false,
      paused: true,
      repeat: 0,
    })

    this.tweens.destroyTween = this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 100,
      paused: true,
      yoyo: false,
      repeat: 0,
    })

    this.tweens.unposibleTween = this.scene.tweens.add({
      targets: this,
      rotation: { from: -.2, to: .2 },
      duration: 80,
      yoyo: false,
      repeat: 1,
      paused: true,
      onComplete: () =>
      {
        this.rotation = 0
      }
    })
  }

  #initEmitters ()
  {
    const particlesSprite = 'particles-spr'
    const emitter = this.scene.add.particles(particlesSprite)
      .setDepth(2)

    const particlesConfig = {
      x: this.x + this.displayWidth / 2,
      y: this.y + this.displayHeigth / 2,
      on: false,
      blendMode: 'ADD',
      lifespan: 600,
      alpha: { 'start': 1, 'end': 0 },
      speed: { 'min': 0, 'max': 200 },
      scale: { 'start': .4, 'end': 0 },
      gravityY: 300,
      bounce: 1,
      maxParticles: 5,
      tint: [this.color],
      frame: ['particle-1'],
    }

    this.particles.destroyEmitter = emitter.createEmitter(particlesConfig)
    this.particles.bombEmitter = emitter.createEmitter({
      ...particlesConfig,
      gravityY: 0,
      maxParticles: particlesConfig * 10,
      speed: 600,
    })
  }

  #pointerdownHandler ()
  {
    const tile = this
    this.emit('click', { tile })
  }

  #calcCoords ()
  {
    const x = this.displayWidth * this.posOnGrid.x + this.displayWidth / 2
    const y = this.displayHeight * this.posOnGrid.y + this.displayHeight / 2

    return { x, y }
  }

  fallTile (value)
  {
    this.tweens.positionTween
      .updateTo('y', value)
      .on('complete', () =>
        {
          this.tweens.positionTween.updateTo('y', value, true)
        })
      .play()
  }

  updateTile ({ frame, type, color, colorName, posOnGrid, empty })
  {
    this.type = type
    this.colorName = colorName
    this.color = color
    this.empty = empty
    this.posOnGrid = posOnGrid

    this.setFrame(frame)

    const coords = this.#calcCoords()

    this.setX(coords.x)

    if (coords.y !== this.y)
    {
      if (this.parentContainer.getData('allowFall'))
      {
        this.fallTile(coords.y)
      }
      else {
        this.setY(coords.y)
      }
    }
  }

  checkPosOnGrid (x, y)
  {
    return this.posOnGrid.x === x && this.posOnGrid.y === y
  }

  unposible ()
  {
    this.tweens.unposibleTween.play()
  }

  remove ()
  {
    if (!this.tweens.destroyTween.isPlaying())
    {
      const { tx, ty } = this.getWorldTransformMatrix()
      const bonus = this.getData('bonus')
      const name = bonus ? bonus.name : 'destroy'

      this.particles[`${name}Emitter`]
        .explode(100, tx, ty)

      this.tweens.destroyTween
        .on('complete', () =>
          {
            this.destroy()
          })
        .play()
    }
  }
}
