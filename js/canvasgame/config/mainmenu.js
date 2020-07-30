define(['gamescreen', 'gamecontroller', 'gameconfig'], (GameScreen, GameController, gameConfig) => {
  return {
    name: 'mainmenu',
    screen: {
      title: 'UCZTA SZEFA KUCHNI',
      font: {
        name: 'Press Start 2P',
        titleSize: 0.005
      },
      buttons: [
        {
          name: 'GRAJ',
          activatingKey: 'ENTER'
        },
        {
          name: 'POMOC',
          activatingKey: 'H'
        }
      ],
    }
  };
});
