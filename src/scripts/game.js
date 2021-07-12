// import Structure from './structure';

import Structure from "./structure";
import User from "./user";

class Game {
    constructor(numHouses, numMarkets, level, seconds, requiredDragonFood) {
        this.numHouses = numHouses;
        this.numMarkets = numMarkets;
        this.level = level
        this.seconds = seconds;
        this.foundFood = 0;
        this.requiredDragonFood = requiredDragonFood;
        this.structures = [];
    }

    promptGame() {
        //throw popup with game instructions
        window.addEventListener('keydown', (event) => {
        })
    }
    
    play() {
        let user = new User();
        this.makeHouses(this.numHouses);
        this.makeMarkets(this.numMarkets);
        this.placeStructures(this.structures);
        user.place();
        this.reDraw(user);
        // this.startTimer();

        //stage game timer
        //track player moves
    }

    reDraw(user) {
        window.addEventListener('keydown', (event) => {
            const board = document.querySelector('canvas');
            const ctx = board.getContext('2d');
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            user.move(event);
            this.placeStructures();
        })
    }

    startTimer() {
        setInterval( () => {
            let ul = document.querySelector('.timer');
            ul.innerHTML = `00:${this.seconds}`;
            if (this.seconds > 0) {
                this.seconds--; 
            } else if (this.second === 0) {
                this.gameStatus();
            }
        }, 1000)
    }

    gameStatus() {
        if (this.requiredDragonFood <= this.foundFood ) {
            //beat level
        } else {
            this.lost()
        }
    }

    makeHouses(num) {
        let houses = [];
        for (let i=0; i<num; i++) {
            let pos = [Math.floor((Math.random() * 560) + 20), (Math.floor(Math.random() * 560) + 20)]
            this.structures.push(new Structure('house', pos));
        }
        return houses;
    }

    makeMarkets(num) {
        let markets = [];
        for (let i = 0; i < num; i++) {
            let pos = [Math.floor((Math.random() * 560) + 20), (Math.floor(Math.random() * 560) + 20)]
            this.structures.push(new Structure('market', pos));
        }
        return markets;
    }

    placeStructures() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        this.structures.forEach( ele => {
            if (ele.type !== 'house') {
                ctx.fillRect(ele.pos[0], ele.pos[1], 20, 20)
                ctx.fillStyle = '#592B1F';
            } else {
                ctx.beginPath();
                ctx.arc(ele.pos[0], ele.pos[1], 10, 0, 2 * Math.PI);
                ctx.strokeStyle = '#C91F37';
                ctx.stroke();
                ctx.fillStyle = '#C91F37';
                ctx.fill();
            }
        })
    };

    beatLevel() {
        //inform user they beat the level
        //instantiate the next level
    }

    won() {
        //inform user they won the game
    }

    lost() {
        // inform user of lost game
        // alert('you Lost')
    }
}

export default Game;