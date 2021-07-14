// import Structure from "./structure";
import User from "./user";
import Board from  "./board";

class Game {
    constructor(level, seconds, requiredDragonFood, numHouses, numMarkets) {
        this.level = level
        this.levelStatus = 'incomplete'
        this.foundFood = 0;
        this.totalSeconds = seconds;
        this.seconds = seconds;
        this.timerSet = ''
        this.timerStart = 0;
        this.requiredDragonFood = requiredDragonFood;
        this.user = new User(300, 300, 2);
        this.board = new Board(numHouses, numMarkets, this.user);
        this.event = ''
        this.gameSet = ''
        this.lastVisited = ''
        this.trackScore();
    }

    promptGame() {
        //throw popup with game instructions
        
    }

    startTimer() {
        
        let li = document.querySelector('.init-level')
        li.classList.remove('init-level')
        li.classList.add('timer-child')
        li.innerHTML = `00:${this.seconds}`;
        this.seconds --;
        this.timerSet = setInterval(() => {
            if (this.seconds > 9 ) {
                li.innerHTML = `00:${this.seconds}`
            } else {
                li.innerHTML = `00:0${this.seconds}`
            }
            this.loadBar();
            this.tips();
            if (this.seconds > 0) {
                this.seconds--;
            } else if (this.second <= 0) {
                clearInterval(this.timerSet)
                li.remove();
            }
        }, 1000)
    }

    loadBar() {
        let bar = document.querySelector(".load-bar")
        let num1 = this.totalSeconds - this.seconds 
        bar.style.width = Math.floor((num1 / this.totalSeconds) * 100) + '%'
    };
    
    play() {
        // creates timer box with timer text
        let liNode = document.createElement('li')
        let ulNode = document.querySelector('.timer')
        let ulPrompt = document.querySelector('.countdown-prompt')
        ulNode.appendChild(liNode)
        liNode.classList.add("init-level")
        liNode.innerHTML = 'Press any key to begin'
        ulPrompt.innerHTML = 'Remaining Time:'
        
        this.user.place();
        this.action();
    }

    action() { // main gameplay logic and flow here
        this.board.placeStructures();

        window.addEventListener('keydown', (event) => {
            this.trackScore();
            clearInterval(this.gameSet)
            this.event = event
            const board = document.querySelector('canvas');
            const ctx = board.getContext('2d');
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            this.gameSet = setInterval( () => this.directUser(), 15);
            this.user.place();
            this.gameStatus();

            while (this.timerStart < 1) { // check for setting timer once per game
                this.startTimer();
                this.timerStart ++
            }
        }, true)
    }

    directUser() { // call to user, directs user movement
        let action = this.event
        this.user.move(action);
        this.collisionCheck();
        this.board.placeStructures();
        this.gameStatus();
    }
        
    collisionCheck() {
        //if time, revisit collision logic for structure size difference
        this.board.structures.forEach( structure => {
            let dist = this.distance(structure.pos, [this.user.x, this.user.y])
            if (dist <= 35) {
                clearInterval(this.gameSet)
                this.incrementScore(structure);
            }
        })
    }

    distance(corda, cordb) {
        let sum1 = (corda[0]) - (cordb[0])
        let sum2 = (corda[1]) - (cordb[1])
        sum1 = sum1 * sum1
        sum2 = sum2 * sum2
        let final = sum1 + sum2
        return Math.sqrt(final)
    }

    trackScore() {
        let scoreBoard = document.querySelector('.food');
        scoreBoard.innerHTML = `${this.foundFood} / ${this.requiredDragonFood}`;
    }

    incrementScore(structure) {
        if (structure.pos === this.lastVisited.pos ) {
            this.tips( structure, structure, structure)
        } else {
            let foodItem = structure.foodItems.shift();
            let itemScore= structure.foodItems.shift();
            this.trackScore();
            if (itemScore) {
                this.board.foodMsg(foodItem, itemScore, structure);
                this.foundFood += itemScore;
                this.tips(foodItem, itemScore);
            } else {
                foodItem = 'No food left here &#128531'
                this.tips(foodItem)
            }
            this.lastVisited = structure;
        }
    }

    gameStatus() {
        this.trackScore();
        if (this.requiredDragonFood <= this.foundFood ) {
            this.beatLevel();
            this.clearGame();
            clearInterval(this.timerSet)
            clearInterval(this.gameSet)
        } else if ( this.seconds <= 0 ) {
            this.lost();
            clearInterval(this.timerSet)
            clearInterval(this.gameSet)
        }
    }

    beatLevel() {
        // let container = document.querySelector(".timer")
        if (this.levelStatus !== 'complete') {
            this.levelStatus = 'complete'
            
            let li = document.querySelector(".timer-child");
            li.remove();

            let button1 = document.querySelector('#end-level-1')
            let button2 = document.querySelector('#end-level-2')
            if (this.level === 1) {
                // container.innerHTML = `Waiting for you..`
                button1.classList.add('nxt-level')
                button1.removeAttribute('id','end-level-1')
                console.log(button1)
            } else if (this.level === 2) {
                button2.classList.add('nxt-level')
                button2.removeAttribute('id', 'end-level-1')
            }
        }
    }

    lost() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    }

    clearGame() {
        document.removeEventListener('keydown', this.action);
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        let timers = document.querySelectorAll(".timer")

        console.log(this.level)
        let bar = document.querySelector(".load-bar")
        bar.style.width = '0%'
    }

    tips(foodItem, points, sameStructure) {
        let tip = document.querySelector('.tip');
        if (sameStructure) {
            tip.innerHTML = `Find a new structure! <br><br> Cannot ask the same structure for food twice in a row.`;
        } else if (foodItem && foodItem.includes('&#128531')) {
            tip.innerHTML = `${foodItem}`;
        }  else if (this.seconds <= 3) {
            tip.innerHTML = `Hurry!<br><br>Time is running out!`;
        }
    }
}

export default Game;