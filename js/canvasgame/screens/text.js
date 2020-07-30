define(['screen'], (Screen) => {

  class TextScreen extends Screen {
    constructor(canvas, color) {
      super(canvas, color);
      this.canvas.style.background = color;
    }

    configureAndDisplay({ font, title, buttons }) {
      this.setTitle(font, title);
      this.setButtons(font, buttons);
    }

    setTitle({ titleSize, name }, title) {
      const newFont = `${titleSize*this.canvas.height}em "${name}"`;
      this.ctx.font = newFont;
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(title, this.canvas.width/2, this.canvas.height*0.2);
    }

    setButtons(font, buttons) {
      let height = 0.15;
      let tempHeight = 0.4;
      for(let button of buttons) {
        this.ctx.fillStyle = 'rgb(65, 69, 71)';
        this.ctx.textAlign = 'center';
        this.ctx.fillRect(this.canvas.width/4, tempHeight*this.canvas.height, 0.5*this.canvas.width, 0.1*this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${font.titleSize*this.canvas.height*0.6}em "${font.name}"`;
        this.ctx.fillText(`${button.name}(${button.activatingKey})`, this.canvas.width/2, (tempHeight+0.08)*this.canvas.height);
        tempHeight += height;
      }
    }
  };

  return TextScreen;
})
