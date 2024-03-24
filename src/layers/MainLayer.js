class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            new Particle(canvas.width/2-1, canvas.height/2, { vx: 0, vy: 0 }),
            //new Particle(100, 650, { vx: 1, vy: 30 }),
            //new Particle(1300, 100, { vx: 0, vy: -40 }),
        ];
        //for (let i=0; i<canvas.height; i+=10) 
       //     this.particles.push(new Particle(canvas.width/2, i, { vx: 0, vy: 10 }));
        this.blackHole = new BlackHole(canvas.width*0.1, canvas.height/2, {vx:0, vy:0});
        this.blackHole2 = new BlackHole(canvas.width*0.9, canvas.height/2, {vx:0, vy:0});
        this.executionStart = Date.now();
    }

    update() {
        this.particles.forEach(p => p.update());
        this.blackHole.update();
        this.blackHole2.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.particles.forEach(p => { 
            p.draw([
                this.blackHole.traslateCoordinate(this.executionStart, { x: p.x, y: p.y }),
                this.blackHole2.traslateCoordinate(this.executionStart, { x: p.x, y: p.y })
            ]);
        });
        this.blackHole.draw();
        this.blackHole2.draw();
    }

}

