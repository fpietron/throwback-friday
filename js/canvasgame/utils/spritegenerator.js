define(() => {
  class SpriteGenerator {
    constructor({ dimensions, frameAmount, source }) {
      this.source = source;
      this.dimensions = dimensions;
      this.spriteRef = document.createElement('img');
      this.spriteRef.style.display = 'none';
      this.spriteRef.src = source;
      this.spriteRef.width = dimensions.width;
      this.spriteRef.height = dimensions.height;
      this.frameAmount = frameAmount;
      this.sprites = this.generateSprites();
    }

    generateSprites() {
      let sprites = [];
      for(let i = 0; i < this.frameAmount; i++) {
        sprites[i] = {
          img: this.spriteRef,
          sx: i*this.dimensions.width,
          sy: 0,
          swidth: this.dimensions.width-1,
          sheight: this.dimensions.height
        };
      }
      return sprites;
    }
  }

  return SpriteGenerator;
})
