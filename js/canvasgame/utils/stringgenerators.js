define({
  generateAmount: (character, min, max) => {
    if(max === 0) {
      return '';
    }
    let result = character;
    let i = max;
    while(i > min) {
      result += ` ${character}`;
      i--;
    }
    return result;
  }
});
