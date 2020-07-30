define(() => {
  class Chameleon {
    constructor({ full, whenToAdapt, startingColor }) {
      this.full = full;
      this.base = 255 - full;
      this.timeToAdapt = 0;
      this.whenToAdapt = whenToAdapt;
      this.color = {
        r: 0,
        g: 0,
        b: 0,
      };
      this.color[startingColor] = full;
    }

    adapt() {
      if (this.timeToAdapt === this.whenToAdapt) {
        let { r, g, b } = this.color;
        if (r === this.full) {
          if (g === 0) b++;
          else if (b === 0) g--;
        }
        if (g === this.full) {
          if (b === 0) r++;
          else if (r === 0) {
            b--;
          }
        }
        if (b === this.full) {
          if (r === 0) g++;
          else if (g === 0) r--;
        }
        this.timeToAdapt = 0;
        this.color = { r, g, b };
        return true;
      } else {
        this.timeToAdapt++;
        return false;
      }
    }

    getRGB() {
      return `rgb(${this.color.r + this.base}, ${this.color.g + this.base}, ${
        this.color.b + this.base
      })`;
    }

    getDarkerRGB() {
      return `rgb(${(this.color.r + this.base) * 0.95}, ${
        (this.color.g + this.base) * 0.95
      }, ${(this.color.b + this.base) * 0.95})`;
    }
  }

  return Chameleon;
});
