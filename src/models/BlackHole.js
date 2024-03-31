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

        let trueDeformation = Math.min(totalDistance, totalDeformation);
        let ratio = trueDeformation/totalDistance;
        let trueX = (1-ratio)*particle.x + ratio*this.x;
        let trueY = (1-ratio)*particle.y + ratio*this.y;

        return {  
            ratio: 1.1**totalDeformation,
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