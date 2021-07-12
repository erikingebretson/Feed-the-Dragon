
class Structure {
    constructor(type, pos) {
        this.pos = pos;
        this.type = type;
        this.food = { 'rice': 100, 'fish': 200, 'pork': 300 };
        this.foodItems = this.getFood(type, this.food);
        this.placeStructure(this.pos);
        this.feedDragon.bind(this);
    }

    getFood(type, obj) {
        let foods = []
        let item = ''
        if (type === 'market') {
            for (let i = 0; i < 5; i++) {
                item = Object.entries(this.food)[Math.floor(Math.random() * 3)]
                foods = foods.concat(item)
            }
        } else {
            for (let i = 0; i < 1; i++) {
                item = Object.entries(this.food)[Math.floor(Math.random() * 2)]
                foods = foods.concat(item)
            }
        };

        return foods;
    };

    feedDragon() {
        let feed = Object.entries(this.food)[0]
        delete this.food.feed.key;
        return feed;
    };

    placeStructure(pos) {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        if (this.type !== 'house') {
            ctx.fillRect(pos[0], pos[1], 20, 20)
            ctx.fillStyle = 'orange';
        } else {
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            ctx.strokeStyle = 'purple';
            ctx.stroke();
            ctx.fillStyle = 'purple';
            ctx.fill();
        }
    };
}

export default Structure;