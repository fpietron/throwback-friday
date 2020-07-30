define(['gamecontroller'], (GameController) => {
  return {
    name: 'help',
    screen: {
      title: 'CO PODAĆ?',
      font: {
        name: 'Press Start 2P',
        titleSize: 0.005
      },
      buttons: [
        {
          name: 'WRÓĆ',
          activatingKey: 'ESC'
        }
      ],
      extras:
    }
  };
});
