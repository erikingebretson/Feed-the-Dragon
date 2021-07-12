
class Structure {
    constructor(type) {
        this.pos = [Math.floor(Math.random() * 600), Math.floor(Math.random() * 600)];
        this.type = type;
        this.food = { 'rice': 100, 'fish': 200, 'pork': 300 };
        this.foodItems = this.getFood(type, this.food);
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
                item = Object.entries(this.food)[Math.floor(Math.random() * 3)]
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
}

export default Structure;