class Dragon {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    place() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        let dragon = document.getElementById("dragon-img")
        ctx.drawImage(dragon, this.x, this.y, 40, 40);
    }

    move() {
        if (this.x > this.dir[0] && this.y === this.dir[1]) {
            this.x += 0;
            this.y += 3;
        } else if (this.y > this.dir[1] && this.x === this.dir[0]) {
            this.x += 0;
            this.y += 3;
        } else if (this.x > this.dir[0] && this.y > this.dir[1]) {
            this.x -= 3;
            this.y -= 3;
        } else if (this.x < this.dir[0] && this.y < this.dir[1]) {
            this.x -= 3;
            this.y -= 3;
        } else {
            this.x += +3;
            this.y += +3;
        }
        this.place();
    }

    delete() {

    }
}

export default Dragon;