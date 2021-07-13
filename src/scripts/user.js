import Structure from "./structure";

class User {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.velocity = 5;
        this.place();
    }
    
    place() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#CB7E1F';
        ctx.stroke();
        ctx.fillStyle = '#CB7E1F';
        ctx.fill();
    }      

    move(event) {
        if (event.key === 'ArrowUp' && (this.y - 2) > 15) {
            this.moveUp();
        } else if (event.key === 'ArrowDown' && (this.y + 2) < 585) {
            this.moveDown();
        } else if (event.key === 'ArrowLeft' && (this.x - 2) > 15) {
            this.moveLeft();
        } else if (event.key === 'ArrowRight' && (this.x + 2) < 585) {
            this.moveRight();
        }
    }
    
    moveUp() {
        this.y -= 2
        this.place();
    }
    
    moveDown() {
        this.y += 2
        this.place();   
    }
    
    moveLeft() {
        this.x -= 2
        this.place();
    }
    
    moveRight() {
        this.x += 2
        this.place();
    }  

    
}

export default User;