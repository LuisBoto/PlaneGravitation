class Particle {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.orientation = 0;
    }

    update() {
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}