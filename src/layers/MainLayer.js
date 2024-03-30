class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            new Particle(canvas.width*2/2+500, canvas.height*2/2-100, { vx: -0, vy: 0 }),
            new Particle(canvas.width*2/2+300, canvas.height*2/2+100, { vx: 0, vy: -30 }),
            //new Particle(100, 650, { vx: 1, vy: 30 }),
            //new Particle(1300, 100, { vx: 0, vy: -40 }),
        ];
        //for (let i=0; i<canvas.height; i+=10) 
       //     this.particles.push(new Particle(canvas.width/2, i, { vx: 0, vy: 10 }));
        this.blackHole = new BlackHole(canvas.width*2*0.3, canvas.height*2/2, {vx:0, vy:0}, 5000);
        this.blackHole2 = new BlackHole(canvas.width*2*0.75, canvas.height*2*0.75, {vx:0, vy:0}, 15000);
        this.blackHole3 = new BlackHole(canvas.width*2*0.5, canvas.height*2/5, {vx:0, vy:0}, 5000);
        this.executionStart = Date.now();
    }

    update() {
        this.particles.forEach(p => p.update());
        this.blackHole.update();
        this.blackHole2.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        //ctx.fillRect(0, 0, canvas.width*2, canvas.height*2);
        this.particles.forEach(p => { 
            p.draw([
                this.blackHole.traslateCoordinate(this.executionStart, p),
                this.blackHole2.traslateCoordinate(this.executionStart, p),
                this.blackHole3.traslateCoordinate(this.executionStart, p)
            ]);
        });

        this.blackHole.draw();
        this.blackHole2.draw();
        this.blackHole3.draw();
    }

}

