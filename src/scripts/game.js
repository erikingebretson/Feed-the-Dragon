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
    }

    promptGame() {
        //throw popup with game instructions
        
    }

    startTimer() {
        let timer = setInterval(() => {
            let ul = document.querySelector('.timer');
            ul.innerHTML = `00:${this.seconds}`;
            if (this.seconds > 0) {
                this.seconds--;
            } else if (this.second === 0) {
                this.gameStatus();
            }
        }, 1000)

        if (this.foundFood >= this.requiredDragonFood) {
            clearInterval(timer)
        }
    }
    
    play() {
        this.user.place();
        this.action();
        window.addEventListener('keyup', (event) => {
            // console.log(event)
            if (event.key === 'Shift') {
                this.startTimer();
            } 
        } )

        //stage game timer
        //track player moves
        
    }

    action() {
        let temp = ''
        this.board.placeStructures();
        window.addEventListener('keydown', (event) => {
            clearInterval(temp)
            this.event = event
            const board = document.querySelector('canvas');
            const ctx = board.getContext('2d');
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            temp = setInterval( () => this.work(), 5);
            this.user.place();
        })
    }

    work() {
        //handle border strikes here - look at user's x & y vals to manipulate the direction
        // let temp = ''
        // clearInterval(temp)
        // console.log(this.user)
        // temp = setInterval(() => this.flow(action), 5);
        let action = this.event
        this.user.move(action);
        this.board.placeStructures();
    }
        
    // flow(action) {
    //     this.user.move(action);
    //     this.board.placeStructures();
    // }

    gameStatus() {
        if (this.requiredDragonFood <= this.foundFood ) {
            //beat level
        } else {
            this.lost()
        }
    }

    

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

    // startTimer() {
    //     setInterval( () => {
    //         let ul = document.querySelector('.timer');
    //         ul.innerHTML = `00:${this.seconds}`;
    //         if (this.seconds > 0) {
    //             this.seconds--; 
    //         } else if (this.second === 0) {
    //             this.gameStatus();
    //         }
    //     }, 1000)
    // }


    // makeHouses(num) {
    //     let houses = [];
    //     for (let i=0; i<num; i++) {
    //         let pos = [Math.floor((Math.random() * 560) + 20), (Math.floor(Math.random() * 560) + 20)]
    //         this.structures.push(new Structure('house', pos));
    //     }
    //     return houses;
    // }

    // makeMarkets(num) {
    //     let markets = [];
    //     for (let i = 0; i < num; i++) {
    //         let pos = [Math.floor((Math.random() * 560) + 20), (Math.floor(Math.random() * 560) + 20)]
    //         this.structures.push(new Structure('market', pos));
    //     }
    //     return markets;
    // }

    // placeStructures() {
    //     const board = document.querySelector('canvas');
    //     const ctx = board.getContext('2d');
    //     this.structures.forEach( ele => {
    //         if (ele.type !== 'house') {
    //             ctx.fillRect(ele.pos[0], ele.pos[1], 20, 20)
    //             ctx.fillStyle = '#592B1F';
    //         } else {
    //             ctx.beginPath();
    //             ctx.arc(ele.pos[0], ele.pos[1], 10, 0, 2 * Math.PI);
    //             ctx.strokeStyle = '#C91F37';
    //             ctx.stroke();
    //             ctx.fillStyle = '#C91F37';
    //             ctx.fill();
    //         }
    //     })
    // };

    
}

export default Game;