class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            new Particle(10, 750, { vx: 0, vy: 0}),
            new Particle(200, 750, { vx: 0, vy: 0}),
            new Particle(300, 750, { vx: 0, vy: 0}),
            new Particle(400, 750, { vx: 0, vy: 0}),
            new Particle(600, 750, { vx: 0, vy: 0}),
            new Particle(1500, 100, { vx: 0, vy: 0}),
            new Particle(1500, 200, { vx: 0, vy: 0}),
            new Particle(1500, 300, { vx: 0, vy: 0}),
            new Particle(1500, 400, { vx: 0, vy: 0}),
            new Particle(1500, 500, { vx: 0, vy: 0}),
        ];
        this.blackHole = new BlackHole(canvas.width/2, canvas.height/3);
        this.executionStart = Date.now();
    }

    update() {
        this.particles.forEach(p => p.update());
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

