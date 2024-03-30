class BlackHole {

    constructor(x, y, speed, mass) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.mass = mass;
    }

    update() {        
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    traslateCoordinate(executionStart, particle) {
        let deltaTime = ((Date.now() - executionStart) / 10000 + 1)**2;
        let deformation = (distance) => {
            if (distance <= 0) return 0;
            let actualDeformation = (this.mass*distance)/(distance**2) * deltaTime;
            return actualDeformation;
        };

        let distanceX = this.x - particle.x;        
        let distanceY = this.y - particle.y;
        let totalDistance = Math.sqrt(distanceX**2 + distanceY**2);

        let totalDeformation = deformation(totalDistance);
        let ratio = totalDeformation/totalDistance;
        let deformedX = (1-ratio)*particle.x + ratio*this.x;
        let deformedY = (1-ratio)*particle.y + ratio*this.y;

        let trueDeformation = Math.min(totalDistance, totalDeformation);
        let trueRatio = trueDeformation/totalDistance;
        let trueX = (1-trueRatio)*particle.x + trueRatio*this.x;
        let trueY = (1-trueRatio)*particle.y + trueRatio*this.y;

        let distanceToSingularity = Math.sqrt((particle.lastTraslatedCoordinate.x-this.x)**2 + (particle.lastTraslatedCoordinate.y+this.y)**2);
        //console.log(distanceToSingularity);
        //console.log(totalDeformation**3);

        return {  
            ratio: 1.1**totalDeformation,//(1/distanceToSingularity)**deltaTime, // MUST INCREASE FASTER AND FASTER 
            //deformationCoordinate: { x: deformedX, y: deformedY },
            trueCoordinate: { x: trueX, y: trueY }
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.mass/300, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}