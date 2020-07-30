define(['gamecontroller'], (GameController) => {
  return {
    name: 'gamepaused',
    screen: {
      title: 'CHWILA PRZERWY',
      font: {
        name: 'Press Start 2P',
        titleSize: 0.005
      },
      buttons: [
        {
          name: 'KONTYNUUJ',
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
