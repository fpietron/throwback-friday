define(['gamecontroller'], (GameController) => {
  return {
    name: 'gameover',
    screen: {
      title: 'KONIEC UCZTY',
      font: {
        name: 'Press Start 2P',
        titleSize: 0.005
      },
      buttons: [
        {
          name: 'NOWA UCZTA',
          activatingKey: 'ENTER'
        }
      ],
    }
  };
});
