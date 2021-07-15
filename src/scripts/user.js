import Structure from "./structure";

class User {
    constructor(x, y, velocity = 2) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.place();
    }
    
    place() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        let user = document.getElementById("hidden-img")
        ctx.drawImage(user, this.x, this.y, 55, 40);
    }      

    move(event) {
        if (event.key === 'ArrowUp' && (this.y - this.velocity) > 0) {
            this.moveUp();
        } else if (event.key === 'ArrowDown' && (this.y + this.velocity) < 560) {
            this.moveDown();
        } else if (event.key === 'ArrowLeft' && (this.x - this.velocity) > 0) {
            this.moveLeft();
        } else if (event.key === 'ArrowRight' && (this.x + this.velocity) < 535) {
            this.moveRight();
        }
    }
    
    moveUp() {
        this.y -= this.velocity
        this.place();
    }
    
    moveDown() {
        this.y += this.velocity
        this.place();   
    }
    
    moveLeft() {
        this.x -= this.velocity
        this.place();
    }
    
    moveRight() {
        this.x += this.velocity
        this.place();
    }  

    
}

export default User;