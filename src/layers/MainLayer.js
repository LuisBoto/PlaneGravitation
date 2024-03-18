class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particle = new Particle(10, 750, { vx: 1, vy: 0});
    }

    update() {
        this.particle.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.particle.draw();
    }

}

