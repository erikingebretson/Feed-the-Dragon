// import Structure from './structure';

import Structure from "./structure";

class Game {
    constructor(numHouses, numMarkets, seconds, numDragonFood) {
        this.numHouses = numHouses;
        this.numMarkets = numMarkets;
        this.seconds = seconds;
        this.numDragonFood = numDragonFood;
        this.structures = [];
        this.makeHouses(this.numHouses);
        this.makeMarkets(this.numMarkets);
    }

    play() {
        //stage game timer
        //track player moves
        
    }

    makeHouses(num) {
        let houses = [];
        for (let i=0; i<num; i++) {
            let pos = [Math.floor(Math.random() * 600), Math.floor(Math.random() * 600)]
            this.structures.push(new Structure('house', pos));
        }
        return houses;
    }

    makeMarkets(num) {
        let markets = [];
        for (let i = 0; i < num; i++) {
            let pos = [Math.floor(Math.random() * 600), Math.floor(Math.random() * 600)]
            this.structures.push(new Structure('market', pos));
        }
        return markets;
    }

}


export default Game;