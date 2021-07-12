class User {
    constructor() {
        this.place();
    }

    place() {
        const board = document.querySelector('canvas');
        const ctx = board.getContext('2d');
        ctx.beginPath();
        ctx.arc(300, 300, 15, 0, 2 * Math.PI);
        ctx.strokeStyle = '#3B3429';
        ctx.stroke();
        ctx.fillStyle = '#3B3429';
        ctx.fill();
    }

    // let gen = (max, min) => {
    //     return Math.floor(Math.random() * (max - min + 1) + min )
    // }
}
export default User;