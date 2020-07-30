define(['canvasobject', 'random', 'sound'], (CanvasObject, random, sound) => {

  class Collidable extends CanvasObject {
    constructor(dimensionsScaling, position, speed, spriteGeneratorData, type, source, affectData, color = '') {
      super(dimensionsScaling, position, speed, spriteGeneratorData, color);
      this.affectData = affectData;
      this.type = type;
      this.source = source;
    }

    collidesWith(canvasObject) {
      let { x, y } = canvasObject.position;
      let { width, height } = canvasObject.dimensions;
      return (
        this.position.x <= x + width-0.01*this.canvas.width &&
        this.position.x >= x - this.dimensions.width+0.01*this.canvas.width &&
        this.position.y <= y + height-0.01*this.canvas.width &&
        this.position.y >= y - this.dimensions.height+0.01*this.canvas.width
      );
    }

    updateDimensions() {
      this.dimensions.height = this.dimensionsScaling.height*this.canvas.height;
      this.dimensions.width = this.dimensionsScaling.width*this.canvas.height;
    }

  };

  return Collidable;
})
