let bodies = [];

class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        bodies = [
            new CelestialBody(canvasWidth*0.5, canvasHeight*0.5, { vx: 0, vy: 0 }, 50000),
            new CelestialBody(canvasWidth*0.8, canvasHeight*0.5, { vx: 1000, vy: 0 }, 200000),
            //new CelestialBody(canvasWidth*0.2, canvasHeight*0.5, { vx: 0, vy: 0 }, 2000000),
        ];
        //for (let i=0; i<400; i++) {
        //    this.addNewRandomBody();
        //}
        this.executionStart = Date.now();
        this.board = new Board();
    }

    update() {
        bodies.forEach(b => b.update());
        this.board.update();
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        bodies.forEach(b => { 
            b.draw(
                bodies.filter(otherBody => otherBody != b)
                .map(otherBody => otherBody.traslateCoordinate(this.executionStart, b))
            );
        });
        this.fuseCollidingBodies();
    }

    fuseCollidingBodies() {
        bodies.filter(body => body.x > canvasWidth*2 || body.x < -canvasWidth*2).forEach(body => bodies.splice(bodies.indexOf(body), 1));
        bodies.filter(body => body.y > canvasHeight*2 || body.y < -canvasHeight*2).forEach(body => bodies.splice(bodies.indexOf(body), 1));

        this.board.checkForCollisions();
    }

    addNewRandomBody() {
        bodies.push(new CelestialBody(canvasWidth*0.1 + canvasWidth*Math.random()*0.8, canvasHeight*0.1 + canvasHeight*Math.random()*0.8, { 
            vx: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1), 
            vy: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1) 
        }, 3000*Math.random()+100));
    }

}

