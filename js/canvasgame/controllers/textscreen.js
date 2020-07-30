define(['controller', 'callbacks'], (Controller, callbacks) => {
  class TextScreenController extends Controller {
    constructor(screen, model, screenConfigs, initialConfigName) {
      super(screen, model);
      this.screenConfigs = screenConfigs;
      this.switchConfigTo(initialConfigName);
      window.addEventListener('keyup', (e) => this.handleKeyPress(e));
      window.addEventListener('resize', () => this.screen.configureAndDisplay(this.currentConfig.screen));
    }

    handleKeyPress({ which }) {
      for(let key in callbacks.text) {
        if(which === Number(key)) {
          callbacks.text[key](this);
        }
      }
    }

    switchConfigTo(configName) {
      this.currentConfigName = configName;
      this.currentConfig = this.screenConfigs[this.currentConfigName];
      this.name = this.screenConfigs[this.currentConfigName].name;
      this.screen.clear();
      this.screen.configureAndDisplay(this.screenConfigs[this.currentConfigName].screen);
    }

    bindGameController(gameController) {
      this.gameController = gameController;
    }

  };

  return TextScreenController;
});
