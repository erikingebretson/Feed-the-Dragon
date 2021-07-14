// import _ from 'lodash';

import Game from './scripts/game';
import Structure from './scripts/structure';

window.addEventListener('DOMContentLoaded', () => {
    let gameInit = document.querySelector(".popup-container")
    gameInit.setAttribute('id','popup-on')
    let button = document.querySelector("#popup-button")
    button.addEventListener('click', (event) => {
        // console.log(event)
        event.preventDefault();
        gameInit.removeAttribute('id', 'popup-on')
        const level1 = new Game(1, 30, 1500, 6, 4);
        level1.play();
        button.remove();
    });

});

// const level2 = new Game(2, 20, 1500, 4, 3)
// const level3 = new Game(3, 10, 1000, 2, 4)