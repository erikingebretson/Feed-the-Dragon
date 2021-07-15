// import _ from 'lodash';

// import { pop } from 'core-js/core/array';
import Game from './scripts/game';
import Structure from './scripts/structure';

window.addEventListener('DOMContentLoaded', () => {
    // popup toggle & content
    let gameInit = document.querySelector(".popup-container")
        gameInit.setAttribute('id','popup-on')
    let popupMessage = document.querySelector(".popup-message")
    let li1 = document.createElement('li')
        li1.innerHTML = "A dragon has visited your village! Luckily the dragon is fairly kind, but we don't want to see it get hungry..."
    let li2 = document.createElement('li')
        li2.innerHTML = "If the dragon’s patience runs out your village will be lost. It will be up to you to gather the village’s food and make sure the dragon is fed before time runs out."
    let ul1 = document.createElement('ul')
        ul1.innerHTML = "Controls"
        ul1.classList.add("controls")
    let ulLi1 = document.createElement('li')
        ulLi1.innerHTML = "<strong>Arrow keys:</strong> will navigate your character through the village"
    let ulLi2 = document.createElement('li')
        ulLi2.innerHTML = "Space bar: will stop your character"
        popupMessage.appendChild(li1)
        popupMessage.appendChild(li2)
        popupMessage.appendChild(ul1)
        ul1.appendChild(ulLi1)
        ul1.appendChild(ulLi2)

    
    let level1 = new Game(1, 15, 600, 6, 4);
    let startButton = document.getElementById("popup-button")
    startButton.addEventListener('click', runLevel1);
    
    function runLevel1(event) {
        event.preventDefault();
        event.stopPropagation();
        gameInit.removeAttribute('id', 'popup-on');
        level1.play();
        startButton.style.display = 'none'
        startButton.removeEventListener('click', runLevel1);
        li1.remove();
        li2.remove();
        ul1.remove();
        ulLi1.remove();
        ulLi2.remove();
    };

    const level2 = new Game(2, 20, 1500, 4, 3)
    let level2Button = document.querySelector("#end-level-1");
    level2Button.addEventListener('click', runLevel2);

    function runLevel2(event) {
        level1.resetScoreCard();
        event.preventDefault();
        event.stopPropagation();
        gameInit.removeAttribute('id', 'popup-on');
        level2.play();
        level2Button.remove();
        level2Button.removeEventListener('click', runLevel2);
    };
    
    
    const level3 = new Game(3, 10, 1000, 2, 4) 
    let level3Button = document.querySelector("#end-level-2");
    level3Button.addEventListener('click', runLevel3)
    
    function runLevel3(event) {
        level2.resetScoreCard();
        event.preventDefault();
        event.stopPropagation();
        gameInit.removeAttribute('id', 'popup-on');
        level3.play();
        level3Button.remove();
        level3Button.removeEventListener('click', runLevel3);
    };

    
    let reloadButton = document.getElementById('reload-button')
    reloadButton.addEventListener('click', window.location.reload.bind(window.location));

    // refactor with the below
    // alternate logic -- create a gamehandler class that stores and instantiates each level
});