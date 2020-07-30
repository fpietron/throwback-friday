define(['canvasobject', 'spritegenerator'], (CanvasObject, SpriteGenerator) => {
  class Player extends CanvasObject {
    constructor({ dimensionsScaling, position, speed, spriteGeneratorData }) {
      super(dimensionsScaling, position, speed, spriteGeneratorData);
      this.position.y = position.y*this.canvas.height;
      this.arrowsPressed = {
        37: false,
        38: false,
        39: false,
        40: false
      }
      window.addEventListener('keydown', e => { if(e.which >= 37 && e.which <= 40) this.arrowPressed(e) });
      window.addEventListener('keyup', e => { if(e.which >= 37 && e.which <= 40) this.arrowReleased(e) });
      this.switchFrameTo(0);
    }

    arrowPressed(e) {
        this.arrowsPressed[e.which] = true;
    }

    arrowReleased(e) {
        this.arrowsPressed[e.which] = false;
    }

    reactTo(collidableType) {
      switch(collidableType) {
        case 'spewgun':
        case 'extralife':
        case 'collectible': {
          this.switchFrameTo(2);
          break;
        }
        case 'drupelet': {
          this.switchFrameTo(4);
          break;
        }
        case 'harmful': {
          this.switchFrameTo(3);
          break;
        }
      }
    }

    update() {
      this.updatePosition();
      this.dimensions.height = this.dimensionsScaling.height*this.canvas.height;
      this.dimensions.width = this.dimensionsScaling.width*this.canvas.height;
      if(this.drawCounter/30 === 1) {
        this.switchFrameTo(this.currentFrame === 0 ? 1 : 0);
        this.drawCounter = 1;
      }
      this.drawCounter++;
    }

    updatePosition() {
      if(this.arrowsPressed['37']) this.move('left');
      if(this.arrowsPressed['38']) this.move('up');
      if(this.arrowsPressed['39']) this.move('right');
      if(this.arrowsPressed['40']) this.move('down');
    }

    move(direction) {
      switch(direction) {
        case 'right': {
          if(this.position.x <= this.canvas.width*0.8-this.dimensionsScaling.width-this.speed.x) this.position.x += this.canvas.width*this.speed.x;
          break;
        }
        case 'left': {
          if(this.position.x >= this.speed.x) this.position.x -= this.canvas.width*this.speed.x;
          break;
        }
        case 'down': {
          if(this.position.y < this.canvas.height-this.dimensionsScaling.height) {
             this.position.y += this.canvas.width*this.speed.y;
             if(this.position.y > this.canvas.height*(1-this.dimensionsScaling.height)) {
               this.position.y = this.canvas.height*(1-this.dimensionsScaling.height);
             }
          }
          break;
        }
        case 'up': {
          if(this.position.y > 0) {
            this.position.y -= this.canvas.width*this.speed.y;
            if(this.position.y <= 0) {
              this.position.y = 0;
            }
          };
          break;
        }
      }
    }

    reset() {
      this.position = {
        x: 0,
        y: this.canvas.height/2
      };
    }

  };

  return Player;
})
