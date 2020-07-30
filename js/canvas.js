require.config({
  baseUrl: '../js/canvasgame',
  paths: {
    'collidable': 'actors/collidable',
    'player': 'actors/player',
    'canvasobject': 'actors/canvasobject',

    'gameovermenuconfig': 'config/gameovermenu',
    'gameconfig': 'config/game',
    'mainmenuconfig': 'config/mainmenu',
    'pausedmenuconfig': 'config/pausedmenu',
    'callbacks': 'config/callbacks',

    'gamecontroller': 'controllers/game',
    'textscreencontroller': 'controllers/textscreen',
    'controller': 'controllers/controller',

    'textscreen': 'screens/text',
    'gamescreen': 'screens/game',
    'screen': 'screens/screen',

    'model': 'model',

    'scalewithratio': 'utils/scalewithratio',
    'random': 'utils/random',
    'sound': 'utils/sound',
    'spritegenerator': 'utils/spritegenerator',
    'chameleon': 'utils/chameleon',
    'stringgenerators': 'utils/stringgenerators'
  },

});

requirejs(['model', 'gamescreen', 'gamecontroller', 'gameconfig', 'mainmenuconfig', 'pausedmenuconfig', 'gameovermenuconfig', 'textscreen', 'textscreencontroller', 'scalewithratio'],
          (Model, GameScreen, GameController, gameConfig, mainMenuConfig, pausedMenuConfig, gameOverMenuConfig, TextScreen, TextScreenController, scaleWithRatio) => {
  scaleWithRatio(0.5625);
  const canvas = document.getElementById('canvas');
  const model = new Model(gameConfig);
  const gameScreen = new GameScreen(canvas);
  const textScreenConfigs = {
    'paused': pausedMenuConfig,
    'main': mainMenuConfig,
    'gameover': gameOverMenuConfig
  }
  const gameController = new GameController(gameScreen, model, gameConfig);
  const textScreen = new TextScreen(canvas);
  const textController = new TextScreenController(textScreen, model, textScreenConfigs, 'main');
  textController.bindGameController(gameController);
  gameController.bindTextController(textController);
});
