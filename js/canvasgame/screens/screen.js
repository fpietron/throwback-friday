define(() => {

  class Screen {
    constructor(canvas, color = 'rgb(255, 155, 155)') {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.canvas.style.background = color;
    }

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    changeBackgroundTo(rgb) {
      this.canvas.style.background = rgb;
    }
  };

  return Screen;
})
