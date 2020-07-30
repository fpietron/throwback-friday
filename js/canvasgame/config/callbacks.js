define({
    text: {
      13: ({ gameController }) => {
            if(!gameController.isRunning) {
              gameController.startGame(gameController.config.gameInterval);
            }
            else if(gameController.isPaused) {
              gameController.resume();
            }
          },
      27: (textController) => {
            if(!textController.gameController.isPaused) {
              textController.gameController.pause();
              textController.switchConfigTo('paused');
            }
          },
      32: ({ gameController, model }) => {
          if(gameController.isRunning) {
            model.shoot();
          }
      }

    }
});
