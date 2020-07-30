define(['textscreen', 'textscreencontroller', 'pausedmenuconfig', 'gameovermenuconfig'],
      (TextScreen, TextScreenController, pausedMenuConfig, gameOverMenuConfig) => {
  return {
    gameInterval: 15,
    state: 'IDLE',
    stats: {
      livesLeft: 3,
      score: 0,
      ammo: {
        type: '',
        amount: 0
      }
    },
    chameleon: {
      full: 100,
      whenToAdapt: 2,
      startingColor: 'r'
    },
    player: {
      dimensionsScaling: {
        'width': 0.1,
        'height': 0.1
       },
       position: {
         'x': 0,
         'y': 0.5
       },
       color: 'blue',
       speed: {
         'x': 0.01,
         'y': 0.01,

       },
       spriteGeneratorData: {
         source: '../assets/sprites/chef.png',
         dimensions: {
           width: 160,
           height: 160
         },
         frameAmount: 5
       }
    },
    particles: {
      amount: 50,
      dimensions: {
        width: 0.06,
        height: 0.008
      },
      color: 'rgba(255, 255, 255, 0.15)',
      speed: {
        min: 3,
        max: 14,
        x: 0.05,
        y: 0
      }
    },
    collidables: {
      collectible: {
        type: 'collectible',
        source: 'game',
        amount: 8,
        dimensions: {
          width: 0.06,
          height: 0.06
        },
        speed: {
          min: 3,
          max: 14
        },
        spriteGeneratorData: {
          source: '../assets/sprites/burger.png',
          dimensions: {
            width: 160,
            height: 160
          },
          frameAmount: 2
        },
        affectData: (model) => {
          model.gameStats.score += 20;
        }
      },
      harmful: {
        type: 'harmful',
        source: 'game',
        amount: 8,
        dimensions: {
          width: 0.07,
          height: 0.07
        },
        speed: {
          min: 3,
          max: 14
        },
        spriteGeneratorData: {
          source: '../assets/sprites/sheet.png',
          dimensions: {
            width: 160,
            height: 160
          },
          frameAmount: 2
        },
        affectData: (model) => {
          model.gameStats.livesLeft--;
        }
      },
      extralife: {
        type: 'extralife',
        source: 'game',
        amount: 1,
        dimensions: {
          width: 0.06,
          height: 0.06
        },
        speed: {
          min: 3,
          max: 14
        },
        spriteGeneratorData: {
          source: '../assets/sprites/donut.png',
          dimensions: {
            width: 160,
            height: 160
          },
          frameAmount: 2
        },
        affectData: (model) => {
          model.gameStats.livesLeft++;
        }
      },
      spewgun: {
        type: 'spewgun',
        source: 'game',
        amount: 1,
        dimensions: {
          width: 0.06,
          height: 0.06
        },
        speed: {
          min: 3,
          max: 14
        },
        spriteGeneratorData: {
          source: '../assets/sprites/spewgun.png',
          dimensions: {
            width: 160,
            height: 160
          },
          frameAmount: 2
        },
        affectData: (model) => {
          model.gameStats.ammo = {
            type: 'drupelet',
            amount: 5
          };
        }
      },
      drupelet: {
        type: 'drupelet',
        source: 'player',
        amount: 0,
        dimensions: {
          width: 0.02,
          height: 0.02
        },
        speed: {
          min: 3,
          max: 14,
          x: -0.03,
          y: 0
        },
        spriteGeneratorData: {
          source: '../assets/sprites/drupelet.png',
          dimensions: {
            width: 160,
            height: 160
          },
          frameAmount: 2
        },
        affectData: (model) => {}
      }
    }
  }

});
