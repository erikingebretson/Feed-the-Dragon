// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';
window.addEventListener('DOMContentLoaded', () => {
    
    const board = document.querySelector('canvas');
    const ctx = board.getContext('2d');
    ctx.font = "48px Yanone Kaffeesatz";
    ctx.fillStyle = "#351E1C";
    ctx.fillText("Feed the Dragon", 175, 50)
    ctx.font = "26px Yanone Kaffeesatz";
    ctx.fillText("A dragon has visited your village! Luckily the dragon is fairly ", 50, 120)
    ctx.fillText("kind, but we don't want to see it get hungry..", 50, 150)
    
    ctx.fillText("If the dragon’s patience runs out you village will be lost. It ", 50, 210)
    ctx.fillText("will be up to you to gather the village’s food and make sure the", 50, 240)
    ctx.fillText("dragon is fed before time runs out.", 50, 270)

    ctx.font = "32px Yanone Kaffeesatz";
    ctx.fillText("Controls", 250, 330)
    ctx.font = "26px Yanone Kaffeesatz";
    ctx.fillText("Arrow keys: will navigate your character through the village", 50, 380)
    ctx.fillText("Space bar: will stop your character", 50, 410)

    ctx.font = "28px Yanone Kaffeesatz";
    ctx.fillText("Have fun :)", 250, 500)


    let buttonNode = document.createElement('button')
    let ul = document.querySelector('.countdown')
    ul.innerHTML = 'Ready to Play?'
    // console.log('button')
    let button = ul.appendChild(buttonNode)
    button.classList.add("start-button")
    button.innerHTML = `Start Game`;
    
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const level1 = new Game(1, 25, 1000, 6, 4);
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

