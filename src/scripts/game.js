// import Structure from "./structure";
import User from "./user";
import Board from  "./board";

class Game {
    constructor(level, seconds, requiredDragonFood, numHouses, numMarkets) {
        this.level = level
        this.foundFood = 0;
        this.seconds = seconds;
        this.requiredDragonFood = requiredDragonFood;
        this.board = new Board(numHouses, numMarkets);
        this.user = new User(300, 300);
        this.event = ''
        this.gameInc = ''
        this.lastVisited = ''
        this.trackScore();

    }

    promptGame() {
        //throw popup with game instructions
        
    }

    startTimer() {
        let timer = setInterval(() => {
            let ul = document.querySelector('.timer');
            ul.innerHTML = `00:${this.seconds}`;
            this.tips();
            if (this.seconds > 0) {
                this.seconds--;
            } else if (this.second <= 0) {
                this.gameStatus();
            }
        }, 1000)

        if (this.foundFood >= this.requiredDragonFood) {
            clearInterval(timer)
        }
    }

    trackScore() {
        let scoreBoard = document.querySelector('.food');
        scoreBoard.innerHTML = `${this.foundFood} / ${this.requiredDragonFood}`;
    }
    
    play() {
        this.user.place();
        this.action();
        window.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.startTimer();
            } 
        } )
        //stage game timer
    }

    action() {
        this.board.placeStructures();
        window.addEventListener('keydown', (event) => {
            clearInterval(this.gameInc)
            this.event = event
            const board = document.querySelector('canvas');
            const ctx = board.getContext('2d');
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.gameInc = setInterval( () => this.work(), 15);
            this.user.place();
            this.trackScore();
            this.gameStatus();
        })
    }

    work() {
        let action = this.event
        this.user.move(action);
        this.collisionCheck();
        this.board.placeStructures();
    }
        
    collisionCheck() {
        //if time, revisit collision logic for structure siae difference
        this.board.structures.forEach( structure => {
            let dist = this.distance(structure.pos, [this.user.x, this.user.y])
            if (dist <= 30) {
                clearInterval(this.gameInc)
                this.incrementScore(structure);
            }
        })
    }

    distance(corda, cordb) {
        let sum1 = (corda[0] + 25) - (cordb[0])
        let sum2 = (corda[1] + 20) - (cordb[1])
        sum1 = sum1 * sum1
        sum2 = sum2 * sum2
        let final = sum1 + sum2
        return Math.sqrt(final)
    }

    incrementScore(structure) {
        if (structure.pos === this.lastVisited.pos ) {
            this.tips( structure, structure, structure)
        } else {
            let foodItem = structure.foodItems.shift();
            let itemScore= structure.foodItems.shift();
            this.foundFood += itemScore;
            this.tips(foodItem, itemScore);
            this.lastVisited = structure;
        }
    }


    gameStatus() {
        if (this.requiredDragonFood <= this.foundFood ) {
            this.beatLevel();
        } else if ( this.seconds <= 0 ) {
            this.lost();
        }
    }

    tips(foodItem, points, sameStructure) {
        let tip = document.querySelector('.tip');
        if (sameStructure) {
            tip.innerHTML = `Find a new structure! <br><br> Cannot ask the same structure for food twice in a row.`;
        } else if (foodItem) {
            tip.innerHTML = `${foodItem}, that's ${points} points!`;
        } else if (this.seconds <= 5) {
            tip.innerHTML = `Hurry!<br><br>Time is running out!`;
        }
    }

    beatLevel() {
        //inform user they beat the level
        //instantiate the next level
        alert(`you beat level ${this.level}`)
    }

    won() {
        //inform user they won the game
    }

    lost() {
        // inform user of lost game
        alert('you Lost')
    }
}

export default Game;