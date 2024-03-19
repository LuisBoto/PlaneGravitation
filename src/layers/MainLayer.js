class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            //new Particle(100, 750, { vx: 2, vy: 0}),
            new Particle(100, 650, { vx: 2, vy: 0.5}),
            //new Particle(100, 550, { vx: 2, vy: 0}),
            //new Particle(100, 450, { vx: 2, vy: 0}),
            //new Particle(100, 350, { vx: 2, vy: 0}),
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

