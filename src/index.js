// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';
window.addEventListener('DOMContentLoaded', () => {
    
    
    // const board = document.querySelector('canvas');
    // const ctx = board.getContext('2d');    
    
    const level1 = new Game(10, 5, 20, 800)
    console.log(level1.structures)
    let struct = level1.structures[7]
    console.log(struct.foodItems)
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

