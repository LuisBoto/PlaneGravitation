class BlackHole {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.mass = 5000;
    }

    update() {        
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    traslateCoordinate(executionStart, coordinate) {
        let deltaTime = ((Date.now() - executionStart) / 1000)**2;
        let deformation = (distance) => {
            if (distance <= 0) return 0;
            let actualDeformation = (this.mass*distance)/(distance**2) * deltaTime;
            return actualDeformation;
        };

        let distanceX = this.x - coordinate.x;        
        let distanceY = this.y - coordinate.y;
        let totalDistance = Math.sqrt(distanceX**2 + distanceY**2);

        let totalDeformation = deformation(totalDistance);
        let ratio = totalDeformation/totalDistance;
        let deformedX = (1-ratio)*coordinate.x + ratio*this.x;
        let deformedY = (1-ratio)*coordinate.y + ratio*this.y;

        let trueDeformation = Math.min(totalDistance, totalDeformation);
        let trueRatio = trueDeformation/totalDistance;
        let trueX = (1-trueRatio)*coordinate.x + trueRatio*this.x;
        let trueY = (1-trueRatio)*coordinate.y + trueRatio*this.y;

        return {  
            ratio: (1/Math.sqrt((this.x-trueX)**2 + (this.y-trueY)**2)), 
            //deformationCoordinate: { x: deformedX, y: deformedY },
            trueCoordinate: { x: trueX, y: trueY }
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}