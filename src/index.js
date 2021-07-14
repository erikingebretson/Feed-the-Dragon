// import _ from 'lodash';

// import { pop } from 'core-js/core/array';
import Game from './scripts/game';
import Structure from './scripts/structure';

window.addEventListener('DOMContentLoaded', () => {
    let gameInit = document.querySelector(".popup-container")
    gameInit.setAttribute('id','popup-on')
    let popupMessage = document.querySelector(".popup-message")
    let li1 = document.createElement('li')
    let li2 = document.createElement('li')
    let ul1 = document.createElement('ul')
    let ulLi1 = document.createElement('li')
    let ulLi2 = document.createElement('li')
    li1.innerHTML = "A dragon has visited your village! Luckily the dragon is fairly kind, but we don't want to see it get hungry.."
    li2.innerHTML = "If the dragon’s patience runs out you village will be lost. It will be up to you to gather the village’s food and make sure the dragon is fed before time runs out."
    ul1.innerHTML = "Controls"
    ul1.classList.add("controls")
    ulLi1.innerHTML = "Arrow keys: will navigate your character through the village"
    ulLi2.innerHTML = "Space bar: will stop your character"
    popupMessage.appendChild(li1)
    popupMessage.appendChild(li2)
    popupMessage.appendChild(ul1)
    ul1.appendChild(ulLi1)
    ul1.appendChild(ulLi2)



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