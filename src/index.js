// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';
window.addEventListener('DOMContentLoaded', () => {
    
    // const board = document.querySelector('canvas');
    // const ctx = board.getContext('2d');
    // ctx.font = "48px Yanone Kaffeesatz";
    // ctx.strokeStyle = "#351E1C";
    // ctx.fillText("Feed the Dragon", 175, 50)

    // ctx.font = "32px Yanone Kaffeesatz";
    // ctx.fillText("test", 175, 150)
        const level1 = new Game(1, 15, 800, 6, 4)
        level1.play();  
    
    // window.addEventListener('keyup', () => {
    // });

    //testing    
    // console.log(level1.board.structures)
    // console.log(level1.structures)
    // console.log(struct.foodItems)
    // let struct = level1.structures[7]
    // console.log(struct.feedDragon())
    // const level2 = new Game(5, 3, 15, 1000)
    // const level3 = new Game(5, 3, 15, 1500)

    // const game = new Game
    // const temp = new Structure('house')
    // const temp2 = new Structure('market')

    // console.log(game)
    // console.log(temp)
    // console.log(temp2)
});

