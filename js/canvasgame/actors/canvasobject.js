define(['spritegenerator', 'random'], (SpriteGenerator, random) => {

  class CanvasObject {
    constructor(dimensionsScaling, position, speed, spriteGeneratorData = {}, color = '') {
      this.canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.color = color;
      this.dimensionsScaling = dimensionsScaling;
      if(Object.keys(spriteGeneratorData).length !== 0) {
        this.spriteGenerator = new SpriteGenerator(spriteGeneratorData);
        this.currentFrame = 0;
        this.drawCounter = 0;
      }
      this.dimensions = {
        height: dimensionsScaling.height*this.canvas.width,
        width: dimensionsScaling.width*this.canvas.width
      };
      this.position = position;
      this.speed = speed;
      this.source = 'game';
      this.speed.x = speed.x;
      this.speed.y = speed.y;
    }

    move() {
      this.position.x -= this.canvas.width*this.speed.x;
      this.position.y -= this.canvas.width*this.speed.y;
      this.dimensions.height = this.dimensionsScaling.height*this.canvas.height;
      this.dimensions.width = this.dimensionsScaling.width*this.canvas.height;

      if(this.leftScreen()) {
        this.perish();
      }
    }

    update() {
      this.move();
      if(this.spriteGenerator && this.drawCounter === 30) {
        this.switchFrameTo(this.currentFrame === 0 ? 1 : 0);
        this.drawCounter = 0;
      }
      this.drawCounter++;
    }

    leftScreen() {
      return this.position.x < 0 || this.position.y > this.canvas.height || this.position.y < 0;
    }

    switchFrameTo(frame) {
      this.currentFrame = frame;
    }

    perish() {
      if(this.source !== 'player') {
        this.respawn();
      }
      else {
        this.position.x = -100;
        this.position.y = -100;
      }
    }

    respawn() {
      let x = this.canvas.width;
      let y = random.generate(0, this.canvas.height-this.dimensions.height);
      this.position = {
        x,
        y
      }
      this.speed.x = random.generate(this.speed.min, this.speed.max)/1500;
    }

    increaseSpeedBy(amount) {
      this.speed.min += amount;
      if(this.speed.min >= this.speed.max) {
        this.speed.max += 10;
      }
    }
  };

  return CanvasObject;

});
