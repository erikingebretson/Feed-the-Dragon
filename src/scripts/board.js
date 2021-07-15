import { _ } from "core-js";
import Structure from "./structure";
import User from "./user";
import Dragon from "./dragon";

class Board {
    constructor(numHouses, numMarkets, user) {
        this.numHouses = numHouses; 
        this.numMarkets = numMarkets;
        this.user = user;
        this.structures = [];
        this.dragons = []
        this.dragonsSet = ''
        this.makeHouses();
        this.makeMarkets();
        this.placeStructures();
        // this.generateDragon();
    }
    
    generatePos() {
        return [Math.floor((Math.random() * 520) + 20), (Math.floor(Math.random() * 520) + 20)]
    }

    makeHouses() {
        for (let i = 0; i < this.numHouses; i++) {
            let pos = this.generatePos();

            let temp = ''
            for (let e=0; e<this.structures.length; e++) {
                temp = this.structures[e].pos
                // console.log(temp)
                if (this.distance(temp, pos) < 100) {
                    pos = this.generatePos();
                    // console.log(pos)
                    e = 0;
                }
            }
            this.structures.push(new Structure('house', pos));
        }
    }

    makeMarkets() {
        for (let i = 0; i < this.numMarkets; i++) {
            let pos = this.generatePos()
            let temp = ''

            for (let e = 0; e < this.structures.length; e++) {
                temp = this.structures[e].pos
                if (this.distance(temp, pos) < 100 || this.userCheck(pos)) {
                    pos = this.generatePos();
                    e = 0;
                }
            }
            this.structures.push(new Structure('market', pos));
        }
    }

    userCheck(pos) {
        // console.log('hi')
        let num1 = 300 - pos[0]
        let num2 = 300 - pos[1]
        if (num1 > -100 && num1 < 100) {
            return true;
        } else if (num2 > -100 && num2 < 100) {
            return true;
        }
        return false;
    }

    distance(corda, cordb) {
        let sum1 = (corda[0]) - (cordb[0])
        let sum2 = (corda[1]) - (cordb[1])
        sum1 = sum1 * sum1
        sum2 = sum2 * sum2
        let final = sum1 + sum2
        
        return Math.sqrt(final)
    }

    placeStructures() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        let market = document.getElementById("market-img")
        let house = document.getElementById("house-img")
        
        this.structures.forEach( ele => {
            if (ele.type === 'market') {
                ctx.drawImage(market, ele.pos[0], ele.pos[1], 65, 40)
            } else {
                ctx.drawImage(house, ele.pos[0], ele.pos[1], 50, 30)
            }
        })
    };

    foodMsg(foodItem, itemScore, structure) {
        let string = `${foodItem}: ${itemScore}`
        if (foodItem === 'Come back soon!') {
            string = 'Come back soon!'
        } else if (foodItem === "Nothing here :(") {
            string = "Nothing here :("
        }

        let pos = structure.pos
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.fillStyle ="#351E1C"
        ctx.font = "32px Yanone Kaffeesatz";
    
        if ( this.user.y < 75 ) {
            ctx.fillText(string, (pos[0]), (pos[1] + 68))
        } else {
            ctx.fillText(string, (pos[0] - 15), (pos[1] - 18))
        }
    }

    // generateDragon() {
    //     let dragon = ''
    //     let axis = ''
    //     let x = ''
    //     let y = ''
    //     this.dragonsSet = setInterval(() => {
    //         axis = Math.floor(Math.random() * 2)
    //         if (axis === 0 ) {
    //             x = 0;
    //             y = Math.floor((Math.random() * 600));
    //         } else {
    //             x = Math.floor((Math.random() * 600));
    //             y = 0;
    //         }
    //         dragon = new Dragon(x,y, [this.user.x, this.user.y])
    //         this.dragons.push(dragon)
    //         dragon.move();
    //     }, 2000)
    // }

    // moveDragons() {
    //     this.dragons.forEach( dragon => {
    //         dragon.move();
    //     })
    // }
}

export default Board;