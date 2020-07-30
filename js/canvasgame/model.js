define(['player', 'collidable', 'canvasobject', 'gameconfig', 'callbacks', 'random', 'sound'], (Player, Collidable, CanvasObject, gameConfig, callbacks, random, sound) => {
  class Model {
    constructor({ stats, player, collidables, particles }) {
      this.canvas = document.getElementById('canvas');
      this.player = new Player(player);
      this.initialGameStats = stats;
      this.gameStats = stats;
      this.playerConfig = player;
      this.collidablesConfig = collidables;
      this.particleConfig = particles;
      this.collidableTypes = [
        'collectible',
        'harmful',
        'extralife',
        'spewgun',
        'drupelet'
      ];

      this.collidables = {};
      this.particles = [];
      this.sounds = {};
      this.resetCollidables();
    }

    shoot() {
      if(this.gameStats.ammo.amount > 0) {
        let { type, source, dimensions, speed, spriteGeneratorData, affectData } = this.collidablesConfig[this.gameStats.ammo.type];
        let bullet = new Collidable(
          dimensions,
          { x: this.player.position.x, y: this.player.position.y+this.player.dimensions.height*0.4 },
          speed,
          spriteGeneratorData,
          type,
          source,
          affectData);
        this.collidables[type].push(bullet);
        sound.play(`../assets/sounds/${type}.wav`, this.sounds['drupelet']);
        this.sounds[type].play();
        this.player.reactTo(type);
        this.gameStats.ammo.amount--;
      }
      else {
        this.collidables[this.gameStats.ammo.type] = [];
        sound.play(`../assets/sounds/noammo.wav`, this.sounds['drupelet']);
      }
    }

    setupCollidables({ type, source, amount, dimensions, speed, spriteGeneratorData, affectData }) {
      let collidables = [];
      let x = this.canvas.width + dimensions.width;

      for(let i = 0; i < amount; i++) {
        let y = random.generate(0, this.canvas.height-dimensions.height);
        collidables[i] = new Collidable(
          dimensions,
          { x, y },
          { x: random.generate(speed.min, speed.max)/1500, y: 0, min: speed.min, max: speed.max },
          spriteGeneratorData,
          type,
          source,
          affectData);
      }

      this.collidables[type] = collidables;
      return this.collidables[type];
    }

    updateCollidables() {
      for(let type of this.collidableTypes) {
        for(let collidable of this.collidables[type]) {
          collidable.update();
          if(collidable.source === 'player') {
            if(collidable.type === 'drupelet') {
              for(let i = 0; i < this.collidables.harmful.length; i++) {
                if(collidable.collidesWith(this.collidables.harmful[i])) {
                  collidable.perish();
                  this.collidables.harmful[i].perish();
                  sound.play('../assets/sounds/squash.wav', this.sounds.squash);
                  break;
                }
              }
            }
          }
          else if(collidable.source === 'game') {
            if(collidable.collidesWith(this.player)) {
              this.player.reactTo(type);
              collidable.perish();
              collidable.affectData(this);
              sound.play(`../assets/sounds/${type}.wav`, this.sounds[type]);
            }
          }
        }
      }
    }

    setupParticles({ type, dimensions, speed, color, amount }) {
      let particles = [];
      let x = this.canvas.width + dimensions.width;
      for(let i = 0; i < amount; i++) {
        let y = random.generate(0, this.canvas.height-dimensions.height);
        particles[i] = new CanvasObject(
          dimensions,
          { x, y },
          { x: random.generate(speed.min, speed.max)/1500, y: 0, min: speed.min, max: speed.max },
          {},
          color);
      }
      this.particles = particles;
      return particles;
    }

    updateParticles() {
      for(let particle of this.particles) {
        particle.update();
      }
    }

    increaseDifficultyBy(amount) {
      for(let type of this.collidableTypes) {
        for(let collidable of this.collidables[type]) {
          collidable.increaseSpeedBy(amount);
        }
      }
    }

    resetCollidables() {
      this.collidableTypes.forEach(type => {
        this.collidables[type] = [];
        this.sounds[type] = sound.configureAudioElement(type);
      });
      this.sounds.squash = sound.configureAudioElement('squash');
    }

    reset() {
      this.resetCollidables();
      this.refillGameStats();
      this.player.reset();
    }

    gameOver() {
      return this.gameStats.livesLeft === 0;
    }

    refillGameStats() {
      this.gameStats = {
        livesLeft: this.initialGameStats.livesLeft,
        score: 0,
        ammo: this.initialGameStats.ammo
      }
    }

  };

  return Model;
});
