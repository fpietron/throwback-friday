define(['controller', 'chameleon', '../canvasgame/config/callbacks'], (Controller, Chameleon, callbacks) => {
  class GameController extends Controller {
    constructor(screen, model, config) {
      super(screen, model);
      this.config = config;
      this.isRunning = false;
      this.isPaused = false;
      this.chameleon = new Chameleon(config.chameleon);
    }

    startGame(interval) {
      this.screen.clear();
      this.model.refillGameStats();
      if(this.interval) {
        clearInterval(this.interval);
      }
      this.isRunning = true;
      setTimeout(() => this.spawnCanvasObjects(this.config), 1000);
      this.interval = setInterval(() => this.updateGame(this.config), interval);
    }

    stopGame() {
      clearInterval(this.interval);
      this.screen.clear();
      this.textController.screenConfigs.gameover.screen.title = `WYNIK: ${this.textController.model.gameStats.score}!`;
      this.model.reset();
      this.isRunning = false;
      this.textController.switchConfigTo('gameover');
    }

    spawnCanvasObjects({ collidables, particles }) {
      for(let collidableType in collidables) {
        this.screen.drawCanvasObjects(this.model.setupCollidables(collidables[collidableType]));
      }
      this.screen.drawCanvasObjects(this.model.setupParticles(particles));
    }

    updateGame({ collidables }) {
      this.model.gameStats.score++;
      if(this.model.gameOver()) {
        this.stopGame();
      }
      else if(!this.isPaused) {
        this.screen.clear();
        if(this.chameleon.adapt()) {
          this.screen.changeBackgroundTo(this.chameleon.getRGB());
        }

        this.model.player.update();
        this.model.updateCollidables();
        this.model.updateParticles();

        for(let particle of this.model.particles) {
          particle.color = this.chameleon.getDarkerRGB();
          this.screen.draw(particle);
        }
        this.screen.draw(this.model.player);
        for(let collidableType in collidables) {
          for(let collidable of this.model.collidables[collidableType]) {
            this.screen.draw(collidable);
          }
        }

        if(this.model.gameStats.score%500 === 0) {
          this.model.increaseDifficultyBy(1);
        }
        this.screen.drawStats(this.model.gameStats);
      }
    }

    bindTextController(textController) {
      this.textController = textController;
    }

    pause() {
      this.isPaused = true;
    }

    resume() {
      this.isPaused = false;
    }
  };

  return GameController;
});
