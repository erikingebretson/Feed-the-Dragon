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
        this.user = new User(300, 300, 1);
        this.board = new Board(numHouses, numMarkets, this.user);
        this.event = ''
        this.gameSet = ''
        this.lastVisited = ''
        this.keyEvent = ''
        this.levelOverMessage= 0;
        this.trackScore();
    }

    startTimer() {
        let li = document.querySelector('.init-level')
            li.classList.remove('init-level')
            li.classList.add('timer-child')
        if (this.seconds > 0) {
            li.innerHTML = `00:${this.seconds}`
        } else {
            li.innerHTML = `00:00`
        }

        if (this.seconds === this.totalSeconds) this.seconds --;
        this.timerSet = setInterval(() => {
            if ( this.second <= 0) {
                li.innerHTML = `00:00`
            } else if (this.seconds > 9) {
                li.innerHTML = `00:${this.seconds}`
            } else {
                li.innerHTML = `00:0${this.seconds}`
            }
            this.loadBar();
            this.tips();
            if (this.seconds > -1) {
                this.seconds--;
            } else if (this.second <= -1) {
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
        let liNode = document.createElement('li')
        let ulNode = document.querySelector('.timer')
        let ulPrompt = document.querySelector('.countdown-prompt')
            ulNode.appendChild(liNode)
            liNode.classList.add("init-level")
            liNode.innerHTML = 'Press any key to begin'
            ulPrompt.innerHTML = 'Remaining Time:'
        
        this.user.place();
        this.board.placeStructures();
        // this.action();
        let that = this;
        if (this.levelStatus === 'incomplete') {
            document.addEventListener('keydown', that.action.bind(that))
        } else {
            document.removeEventListener('keydown', that.action.bind(that));
        }
    }
    
    action(event) { // main gameplay logic and flow here
        let that = this;
        if (this.levelStatus === 'complete') document.removeEventListener('keydown', that.action.bind(that));
        this.board.placeStructures();
        event.preventDefault();
        event.stopPropagation();
        // document.addEventListener('keydown', (event) => {
        // console.log(this.level)
        // console.log(this.foundFood)
        
        this.trackScore();
        clearInterval(this.gameSet)
        this.event = event
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        this.gameSet = setInterval( () => this.directUser(), 7);
        this.user.place();
        this.gameStatus();

        // check for setting timer once per game
        while (this.timerStart < 1) { 
            this.startTimer();
            this.timerStart ++
        }
        // });
    }

    directUser() { // call to user, directs user movement
        let action = this.event
        this.user.move(action);
        this.collisionCheck();
        this.board.placeStructures();
        this.gameStatus();
    }
        
    collisionCheck() {
        this.board.structures.forEach( structure => {
            let dist = this.distance(structure.pos, [this.user.x, this.user.y])
            if (dist <= 35) {
                clearInterval(this.gameSet)
                this.user.x = this.user.lastPos[0]
                this.user.y = this.user.lastPos[1]
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
        let message = ''
        if (structure.pos === this.lastVisited.pos ) {
            this.tips(structure, structure, structure)
            message = 'Come back soon!'
            this.board.foodMsg(message, structure, structure)
        } else {
            let foodItem = structure.foodItems.shift();
            let itemScore= structure.foodItems.shift();
            this.trackScore();
            if (itemScore) {
                this.board.foodMsg(foodItem, itemScore, structure);
                this.foundFood += itemScore;
                this.tips(foodItem, itemScore);
            } else {
                message = "Nothing here :("
                this.board.foodMsg(message, structure, structure)
                foodItem = 'No food left here &#128531'
                this.tips(foodItem)
            }
            this.lastVisited = structure;
        }
    }

    clearGame() {
        //removes keystroke event listener - need to make this work..
        let that = this;
        document.removeEventListener('keydown', that.action.bind(that));

        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    }

    // destroy() { // destroy has not worked...
    //     delete this.level;
    //     delete this.foundFood;
    //     this = undefined;
    //     console.log(delete this);
    //     delete this;
    // }
    
    gameStatus() {
        this.trackScore();
        if (this.requiredDragonFood <= this.foundFood ) {
            this.beatLevel();
            this.clearGame();
            
            clearInterval(this.timerSet)
            clearInterval(this.gameSet)
        } else if ( this.seconds <= -1 ) {
            this.clearGame();
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
                button1.classList.add('nxt-level')
                button1.removeAttribute('id','end-level-1')
            } else if (this.level === 2) {
                button2.classList.add('nxt-level')
                button2.removeAttribute('id', 'end-level-2')
            } else if (this.level === 3) {
                this.won()
            }
        }
    }

    won() {
        while (this.levelOverMessage < 1) {
            let popUp = document.querySelector(".popup-container")
            popUp.setAttribute('id', 'popup-on')
            let popupTitle = document.querySelector(".popup-title")
            popupTitle.innerHTML = "You Won!"
            let li1 = document.createElement('li')
            li1.innerHTML = "Thanks for playing my game!<br><br>This was a fun excercise in Javascript DOM manipulation, CSS, and Canvas. I hope you enjoyed the experience and just maybe had fun along the way!"
            let li2 = document.createElement('li')
            li2.innerHTML = "If you haven't already, check out my GitHub, LinkedIn, or send me an email."
            let popupMessage = document.querySelector(".popup-message")
            popupMessage.appendChild(li1)
            popupMessage.appendChild(li2)
            let button = document.querySelector("#reload-button")
            button.style.display = 'inline'
            button.innerHTML = "Restart Game"
            let img = document.querySelector("#popup-character")
            img.src = 'lib/assets/char-head-icon.png'
            this.levelOverMessage++;
        }
    }
    
    lost() {
        this.clearGame()
        
        //toggle popup on with lost message
        while (this.levelOverMessage < 1) {
            let popUp = document.querySelector(".popup-container")
                popUp.setAttribute('id', 'popup-on')
            let popupTitle = document.querySelector(".popup-title")
                popupTitle.innerHTML = "GAME OVER"
            let li1 = document.createElement('li')
                li1.innerHTML = "You weren't able to feed the hungry dragon today, but there's always tomorrow. Try again and here's a hint:"
            let li2 = document.createElement('li')
                li2.innerHTML = "Market's generally have more resources than a home. Try visiting them more next time!"
            let popupMessage = document.querySelector(".popup-message")
                popupMessage.appendChild(li1)
                popupMessage.appendChild(li2)
            let button = document.querySelector("#reload-button")
                button.style.display = 'inline'
                button.innerHTML = "Restart Game"
            let img = document.querySelector("#popup-character")
                img.src = 'lib/assets/char-head-icon.png'
            this.levelOverMessage ++;
        }
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