class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particle = new Particle(10, 750, { vx: 0, vy: 0});
        this.blackHole = new BlackHole(canvas.width/2, canvas.height/3);
        this.executionStart = Date.now();
    }

    update() {
        this.particle.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let traslatedCoordinate = this.blackHole.traslateCoordinate(this.executionStart, { x: this.particle.x, y: this.particle.y });
        this.particle.draw(traslatedCoordinate);
        this.blackHole.draw();
    }

}

