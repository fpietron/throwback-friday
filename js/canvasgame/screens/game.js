define(['screen', 'random', 'stringgenerators'], (Screen, random, stringGenerators) => {

  class GameScreen extends Screen {
    constructor(canvas, color) {
      super(canvas, color);
      this.canvas.style.background = color;
    }

    drawCanvasObjects(canvasObjects) {
      for(let canvasObject of canvasObjects) {
        this.draw(canvasObject);
      }
    }


    draw(canvasObject) {
      if(!canvasObject.spriteGenerator) {
        canvasObject.ctx.fillStyle = canvasObject.color;
        canvasObject.ctx.fillRect(canvasObject.position.x, canvasObject.position.y, canvasObject.dimensions.width, canvasObject.dimensions.height);
      }
      else {
        let { img, sx, sy, swidth, sheight, x, y } = canvasObject.spriteGenerator.sprites[canvasObject.currentFrame];
        canvasObject.ctx.drawImage(img, sx, sy, swidth, sheight, canvasObject.position.x, canvasObject.position.y, canvasObject.dimensions.width, canvasObject.dimensions.height);
      }
    }

    drawStats({ livesLeft, score, ammo }) {
      this.ctx.font = `${this.canvas.height*0.002}em "Press Start 2P"`;
      this.ctx.fillStyle = 'red';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(stringGenerators.generateAmount('❤', 1, livesLeft), this.canvas.width*0.06, this.canvas.height*0.08);
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`PUNKTY: ${score}`, this.canvas.width*0.75, this.canvas.height*0.08);
      this.ctx.fillText(`AMUNICJA: ${stringGenerators.generateAmount('❇', 1, ammo.amount)}`, this.canvas.width*0.06, this.canvas.height*0.94);
    }
  };

  return GameScreen;
})
