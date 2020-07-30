define(() => {
  const canvasContainer = document.getElementById('canvascontainer');
  function scaleWithRatio(ratio) {

    function createSharpCanvas(width, height) {
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = canvas.width;
      canvas.style.height = canvas.height;
      return canvas;
    }

    function updateGameCanvasSize() {
      canvas.width = canvasContainer.offsetWidth*0.9;
      canvas.height = 0.56*canvas.width;
      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";
    }

    const canvas = createSharpCanvas(100, 56.25);
    canvas.id = "canvas";
    canvasContainer.appendChild(canvas);
    updateGameCanvasSize();
    window.addEventListener('resize', updateGameCanvasSize);
    }

  return scaleWithRatio;
});
