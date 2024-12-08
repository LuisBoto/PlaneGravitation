class MainLayer {

    constructor() {
        this.initiate();
    }

    initiate() {
        this.moving = new CelestialBody(canvasWidth*0.5, canvasHeight*0.5, { vx: 0, vy: 0 }, 30000)
        this.bodies = [
            //new CelestialBody(canvasWidth*0.5, canvasHeight*0.2, { vx: 10, vy: 500 }, 5000),
            //new CelestialBody(canvasWidth*0.5, canvasHeight*0.8, { vx: 10, vy: -500 }, 5000),
            new CelestialBody(canvasWidth*0.99, canvasHeight*0.5, { vx: 0, vy: 0 }, 2999001),
            new CelestialBody(canvasWidth*0.01, canvasHeight*0.5, { vx: 0, vy: 0 }, 3000000),
        ];
        /*for (let i=0; i<400; i++) {
            this.addNewRandomBody();
        }*/
        this.executionStart = Date.now();
        this.bodies.forEach(b => { 
            b.draw(
                this.bodies.filter(otherBody => otherBody != b)
                .map(otherBody => otherBody.traslateCoordinate(this.executionStart, b))
            );
        });
    }

    update() {
        this.bodies.forEach(b => b.update());
        
        window.nodies = this.bodies;
    }

    draw() {
        //ctx.fillStyle = '#FFF';
        //ctx.fillRect(0, 0, canvasWidth, canvasHeight);


        this.moving.draw(this.bodies.map(otherBody => otherBody.traslateCoordinate(this.executionStart, this.moving)));
        //this.bodies.forEach(b => b.draw([b.traslateCoordinate(this.executionStart, b)]))
        this.fuseCollidingBodies();
    }

    fuseCollidingBodies() { // TODO change to O(n)
        this.bodies.filter(body => body.x > canvasWidth*2 || body.x < -canvasWidth*2).forEach(body => this.bodies.splice(this.bodies.indexOf(body), 1));
        this.bodies.filter(body => body.y > canvasHeight*2 || body.y < -canvasHeight*2).forEach(body => this.bodies.splice(this.bodies.indexOf(body), 1));

        this.bodies.filter(body => body.traceCache.length > 0).forEach(body => {
            this.bodies.filter(secondBody => 
                // Math.abs(body.x - secondBody.x) < Utils.getRadiusForBody(body) &&
                // Math.abs(body.y - secondBody.y) < Utils.getRadiusForBody(body) &&
                secondBody.traceCache.length > 0 &&
                secondBody != body)
                .some(secondBody => {    
                    let firstBodyVisualPosition = body.traceCache[body.traceCache.length-1];
                    let firstBodyRadius = Utils.getRadiusForBody(body);
                    let secondBodyVisualPosition = secondBody.traceCache[secondBody.traceCache.length-1];
                    let secondBodyRadius = Utils.getRadiusForBody(secondBody);
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
                        //i = 0;
                        return true;
                    }
                });
        });

        /*if(this.bodies.length <= 20) 
            for (let i=0; i<100; i++) 
                this.addNewRandomBody();*/
    }

    addNewRandomBody() {
        this.bodies.push(new CelestialBody(canvasWidth*0.1 + canvasWidth*Math.random()*0.8, canvasHeight*0.1 + canvasHeight*Math.random()*0.8, { 
            vx: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1), 
            vy: 400*Math.random()*(Math.random() > 0.5 ? -1 : 1) 
        }, 3000*Math.random()+100));
    }

}

