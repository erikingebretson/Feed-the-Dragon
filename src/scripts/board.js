import Structure from "./structure";
import User from "./user";

class Board {
    constructor(numHouses, numMarkets) {
        this.numHouses = numHouses;
        this.numMarkets = numMarkets;
        this.structures = [];
        this.makeHouses();
        this.makeMarkets();
        this.placeStructures();
    }
    

    makeHouses() {
        for (let i = 0; i < this.numHouses; i++) {
            let pos = this.generatePos()
            this.structures.push(new Structure('house', pos));
        }
    }


    makeMarkets() {
        for (let i = 0; i < this.numMarkets; i++) {
            let pos = this.generatePos()
            this.structures.push(new Structure('market', pos));
        }
    }

    generatePos() {
        return [Math.floor((Math.random() * 560) + 20), (Math.floor(Math.random() * 560) + 20)]
    }

    placeStructures() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        
        this.structures.forEach( ele => {
            if (ele.type === 'market') {
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

}

export default Board;