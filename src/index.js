// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';
window.addEventListener('DOMContentLoaded', () => {
    
    
    const board = document.querySelector('canvas');
    const ctx = board.getContext('2d');
    ctx.fillStyle = 'green';
    // let bottomRight = ctx.fillRect(580, 580, 20, 20);
    // let topRight = ctx.fillRect(580, 0, 20, 20);
    // let topLeft = ctx.fillRect(0, 0, 20, 20);
    // let bottomLeft = ctx.fillRect(0, 580, 20, 20);
    // let mid = ctx.fillRect(300, 300, 20, 20)
    
    
    const level1 = new Game(5, 5, 20, 800)
    console.log(level1.structures)
    console.log(level1.structures[0])
    // const level2 = new Game(5, 3, 15, 1000)
    // const level3 = new Game(5, 3, 15, 1500)

    // const game = new Game
    // const temp = new Structure('house')
    // const temp2 = new Structure('market')

    // console.log(game)
    // console.log(temp)
    // console.log(temp2)
});

