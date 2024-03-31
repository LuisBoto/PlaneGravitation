class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.bodies = [
            //new CelestialBody(canvasWidth/2+500, canvasHeight/2-100, { vx: -0, vy: 0 }, 100),
            //new CelestialBody(canvasWidth/2+300, canvasHeight/2+100, { vx: 0, vy: -30 }, 400),
            //new CelestialBody(canvasWidth*0.75, canvasHeight/2, { vx: 0, vy: -85 }, 100),
            //new CelestialBody(canvasWidth*0.40, canvasHeight*0.25, { vx: 0, vy: 100 }, 50),
            //new CelestialBody(canvasWidth*0.5, canvasHeight*0.5, { vx: 0, vy: 0 }, 500000),
            new CelestialBody(canvasWidth*0.5, canvasHeight*0.5, { vx: 0, vy: 0 }, 500000),
            //new CelestialBody(canvasWidth*0.6, canvasHeight*0.2, { vx: 0, vy: 0 }, 500000),
        ];
        for (let i=0; i<100; i++) {
            this.bodies.push(new CelestialBody(canvasWidth*Math.random(), canvasHeight*Math.random(), { 
                vx: 100*Math.random()*(Math.random() > 0.5 ? -1 : 1), 
                vy: 100*Math.random()*(Math.random() > 0.5 ? -1 : 1) 
            }, 3000*Math.random()+100));
        }
        this.executionStart = Date.now();
    }

    update() {
        this.bodies.forEach(b => b.update());
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        this.bodies.forEach(b => { 
            b.draw(this.bodies.filter(otherBody => otherBody != b).map(otherBody => otherBody.traslateCoordinate(this.executionStart, b)));
        });
    }

}

