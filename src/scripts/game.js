// import Structure from './structure';

import Structure from "./structure";
import User from "./user";



class Game {
    constructor(numHouses, numMarkets, level, seconds, numDragonFood) {
        this.numHouses = numHouses;
        this.numMarkets = numMarkets;
        this.level = level
        this.seconds = seconds;
        this.numDragonFood = numDragonFood;
        this.structures = [];
    }
    
    play() {
        let user = new User();
        user.place();

        this.makeHouses(this.numHouses);
        this.makeMarkets(this.numMarkets);

        //stage game timer
        //track player moves
        
    }

    startTimer(seconds) {

    }

    makeHouses(num) {
        let houses = [];
        for (let i=0; i<num; i++) {
            let pos = [Math.floor(Math.random() * 580 + 20), Math.floor(Math.random() * 580 + 20)]
            // let pos = [Math.floor(Math.random() * 600), Math.floor(Math.random() * 600)]
            this.structures.push(new Structure('house', pos));
        }
        return houses;
    }

    makeMarkets(num) {
        let markets = [];
        for (let i = 0; i < num; i++) {
            let pos = [Math.floor(Math.random() * 580 + 20), Math.floor(Math.random() * 580 + 20)]
            // let pos = [Math.floor(Math.random() * 600), Math.floor(Math.random() * 600)]
            this.structures.push(new Structure('market', pos));
        }
        return markets;
    }

}

export default Game;