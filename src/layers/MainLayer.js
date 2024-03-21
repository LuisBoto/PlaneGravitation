class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            new Particle(1100, 450, { vx: 0, vy: 2 }),
            new Particle(100, 650, { vx: 2, vy: 25 }),
            new Particle(1300, 100, { vx: 1, vy: -20 }),
        ];
        this.blackHole = new BlackHole(canvas.width/2, canvas.height/3, {vx:0, vy:0});
        this.executionStart = Date.now();
    }

    update() {
        this.particles.forEach(p => p.update());
        this.blackHole.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.particles.forEach(p => { p.draw(
            this.blackHole.traslateCoordinate(this.executionStart, { x: p.x, y: p.y }))
        });
        this.blackHole.draw();
    }

}

