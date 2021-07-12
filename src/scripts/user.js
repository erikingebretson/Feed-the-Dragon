class User {
    constructor() {
        this.pos = [300, 300]
        this.place();
    }

    place() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        // console.log(this.pos)
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], 15, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    move(event) { 
        if (event.key === 'ArrowUp' && (this.pos[1] - 15) > 0) {
                this.pos[1] -= 15
        } else if (event.key === 'ArrowDown' && (this.pos[1] + 15) < 600) {
                this.pos[1] += 15
        } else if (event.key === 'ArrowLeft' && (this.pos[0] - 15) > 0) {
                this.pos[0] -= 15
        } else if (event.key === 'ArrowRight' && (this.pos[0] + 15) < 600) {
            // console.log(po)
                this.pos[0] += 15
        } else {
        this.place();
        };
        this.place();
    }
   
}
export default User;