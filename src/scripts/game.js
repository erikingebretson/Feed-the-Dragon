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
        let li = document.querySelector('.start')
        li.classList.remove("start")
        li.classList.add("timer")
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
                // this.gameStatus();
                clearInterval(this.timerSet)
            }
        }, 1000)
        this.gameStatus();
    }

    loadBar() {
        let bar = document.querySelector(".load-bar")
        let num1 = this.totalSeconds - this.seconds 
        let percent = Math.floor((num1 / this.totalSeconds) * 100) + '%'
        bar.style.width = percent
        // bar.innerHTML = percent
    };
    
    play() {
        let liNode = document.createElement('li')
        let ulNode = document.querySelector('.timer')
        ulNode.classList.remove('timer')
        ulNode.innerHTML = 'Seconds Remaining:'
        let li = ulNode.appendChild(liNode)
        li.innerHTML = `Press any key to Start`;
        li.classList.add("start")
        
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
        })
    }

    directUser() { // call to user, directs user movement
        // const board = document.querySelector('canvas');
        // const ctx = board.getContext('2d');
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        // this.board.moveDragons();
        
        let action = this.event
        this.user.move(action);
        this.collisionCheck();
        this.board.placeStructures();
        this.gameStatus();
    }
        
    collisionCheck() {
        //if time, revisit collision logic for structure siae difference
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
            clearInterval(this.timerSet)
        } else if ( this.seconds <= 0 ) {
            this.lost();
        }
    }

    beatLevel() {
        // alert(`you beat level ${this.level}`)
        clearInterval(this.gameSet)
        clearInterval(this.timerSet)
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        // this.levelStatus = 'complete'
        // let button = document.querySelector('.countdown')
        // let nxtButton = document.createElement('button')
        // nxtButton.classList.add('nxt-level')
        // if (this.level === 1) {
        //     button.innerHTML = `Waiting for you..`
        //     nxtButton.setAttribute('id','end-level-1')
        //     nxtButton.innerHTML = "Level 2"
        // } else if (this.level === 2) {
        //     button.innerHTML = `Final Round!`
        //     nxtButton.setAttribute('id','end-level-2')
        //     nxtButton.innerHTML = "Level 3"
        // }

        this.levelStatus = 'complete'
        let container = document.querySelector(".countdown")
        let button1 = document.getElementById('end-level-1')
        let button2 = document.querySelector('#end-level-2')
        if (this.level === 1) {
            console.log(button1)
            container.innerHTML = `Waiting for you..`
            button1.classList.remove('button-off')
        } else if (this.level === 2) {
            button = document.querySelector('#end-level-2')
            button2.classList.remove('class', 'button-off')
        }
        // button.appendChild(nxtButton)

    }

    won() {
        //inform user they won the game
        clearInterval(this.gameSet)
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        alert('you beat dis shit')
    }

    lost() {
        // inform user of lost game
        clearInterval(this.gameSet)
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        // alert('you Lost')
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