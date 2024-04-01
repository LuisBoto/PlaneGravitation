class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.bodies = [
            new CelestialBody(canvasWidth*0.2, canvasHeight*0.5, { vx: 0, vy: 0 }, 500000),
            new CelestialBody(canvasWidth*0.8, canvasHeight*0.5, { vx: 0, vy: 0 }, 200000),
        ];
        for (let i=0; i<400; i++) {
            this.bodies.push(new CelestialBody(canvasWidth*Math.random(), canvasHeight*Math.random(), { 
                vx: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1), 
                vy: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1) 
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

