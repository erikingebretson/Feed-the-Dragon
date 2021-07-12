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
            this.structures.push(new Structure('house'))
        }
        return houses;
    }

    makeMarkets(num) {
        let markets = [];
        for (let i = 0; i < num; i++) {
            this.structures.push(new Structure('market'))
        }
        return markets;
    }

}


export default Game;