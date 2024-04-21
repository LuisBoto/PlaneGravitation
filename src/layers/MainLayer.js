class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.bodies = [
            new CelestialBody(canvasWidth*0.5, canvasHeight*0.5, { vx: 0, vy: 0 }, 50000),
            //new CelestialBody(canvasWidth*0.8, canvasHeight*0.5, { vx: 50, vy: 50 }, 200000),
            //new CelestialBody(canvasWidth*0.85, canvasHeight*0.5, { vx: 50, vy: 50 }, 200000),
        ];
        for (let i=0; i<400; i++) {
            this.bodies.push(new CelestialBody(canvasWidth*0.3 + canvasWidth*Math.random()*0.4, canvasHeight*0.3 + canvasHeight*Math.random()*0.4, { 
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
            b.draw(
                this.bodies.filter(otherBody => otherBody != b)
                .map(otherBody => otherBody.traslateCoordinate(this.executionStart, b))
            );
        });
        this.fuseCollidingBodies();
    }

    fuseCollidingBodies() { // TODO change to O(n)
        for (let i = 0; i < this.bodies.length; i++) {
            let body = this.bodies[i];
            for (let j = 0; j < this.bodies.length; j++) {
                let secondBody = this.bodies[j];
                if (i==j || body.traceCache.length == 0 || secondBody.traceCache.length == 0)
                    continue;

                let firstBodyVisualPosition = body.traceCache[body.traceCache.length-1];
                let firstBodyRadius = Utils.getRadiusForBody(body);
                let secondBodyRadius = Utils.getRadiusForBody(secondBody);
                let secondBodyVisualPosition = secondBody.traceCache[secondBody.traceCache.length-1];
                let distance = Math.sqrt((firstBodyVisualPosition.x - secondBodyVisualPosition.x)**2 + (firstBodyVisualPosition.y - secondBodyVisualPosition.y)**2);
                if (distance < firstBodyRadius || distance < secondBodyRadius) {
                    let biggerBody = body.mass > secondBody.mass ? body : secondBody;
                    this.bodies.splice(this.bodies.indexOf(body), 1);
                    this.bodies.splice(this.bodies.indexOf(secondBody), 1);

                    let totalMass = body.mass + secondBody.mass;
                    let fusedBody = new CelestialBody(

                        (body.x*body.mass+secondBody.x*secondBody.mass)/totalMass, (body.y*body.mass+secondBody.y*secondBody.mass)/totalMass,
                        { 
                            vx: (body.speed.vx*body.mass + secondBody.speed.vx*secondBody.mass)/totalMass,
                            vy: (body.speed.vy*body.mass + secondBody.speed.vy*secondBody.mass)/totalMass
                        }, 
                        body.mass + secondBody.mass
                    );
                    fusedBody.color = biggerBody.color;
                    this.bodies.push(fusedBody);
                    //return; // this.fuseCollidingBodies();
                    i = 0;
                    j = 0;
                }
            }
        }
        return;
    }

}

