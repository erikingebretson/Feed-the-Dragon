// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';
window.addEventListener('DOMContentLoaded', () => {
    
    const board = document.querySelector('canvas');
    const ctx = board.getContext('2d');
    ctx.font = "48px Yanone Kaffeesatz";
    ctx.strokeStyle = "#351E1C";
    ctx.fillText("Feed the Dragon", 175, 50)
    ctx.font = "26px Yanone Kaffeesatz";
    ctx.fillText("A dragon has visited your village! Luckily the dragon is fairly ", 50, 120)
    ctx.fillText("kind, but don’t let the dragon get hungry..", 5, 150)

    let buttonNode = document.createElement('button')
    let ul = document.querySelector('.countdown')
    ul.innerHTML = 'Ready to Play?'
    // console.log('button')
    let button = ul.appendChild(buttonNode)
    button.classList.add("start-button")
    button.innerHTML = `Start Game`;
    
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const level1 = new Game(1, 5, 100, 6, 4);
        level1.play();  
    });


    // const level2 = new Game(2, 20, 1500, 6, 4)
    // const level3 = new Game(3, 10, 1000, 2, 4)

    //testing    
    // console.log(level1.board.structures)
    // console.log(level1.structures)
    // console.log(struct.foodItems)
    // let struct = level1.structures[7]
    // console.log(struct.feedDragon())

    // const game = new Game
    // const temp = new Structure('house')
    // const temp2 = new Structure('market')

    // console.log(game)
    // console.log(temp)
    // console.log(temp2)
});

