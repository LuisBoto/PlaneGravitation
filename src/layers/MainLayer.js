class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.particles = [
            new Particle(canvasWidth/2+500, canvasHeight/2-100, { vx: -0, vy: 0 }),
            new Particle(canvasWidth/2+300, canvasHeight/2+100, { vx: 0, vy: -30 }),
            //new Particle(100, 650, { vx: 1, vy: 30 }),
            //new Particle(1300, 100, { vx: 0, vy: -40 }),
        ];
        //for (let i=0; i<canvas.height; i+=10) 
       //     this.particles.push(new Particle(canvas.width/2, i, { vx: 0, vy: 10 }));
        this.blackHole = new BlackHole(canvasWidth*0.3, canvasHeight/2, {vx:0, vy:0}, 5000);
        this.blackHole2 = new BlackHole(canvasWidth*0.75, canvasHeight*0.75, {vx:0, vy:0}, 7000);
        this.blackHole3 = new BlackHole(canvasWidth*0.5, canvasHeight/5, {vx:0, vy:0}, 5000);
        this.executionStart = Date.now();
    }

    update() {
        this.particles.forEach(p => p.update());
        this.blackHole.update();
        this.blackHole2.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
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

