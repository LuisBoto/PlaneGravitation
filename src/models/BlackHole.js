class BlackHole {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.mass = 500;
    }

    update() {        
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    traslateCoordinate(executionStart, coordinate) {
        let deltaTime = ((Date.now() - executionStart) / 10);
        let deformation = (distance) => {
            if (distance <= 0) return 0;
            let actualDeformation = (this.mass*distance)/(distance**2) * deltaTime;
            return actualDeformation;
        };

        let distanceX = this.x - coordinate.x;        
        let distanceY = this.y - coordinate.y;
        let totalDistance = Math.sqrt(distanceX**2 + distanceY**2);
        let totalDeformation = Math.min(totalDistance, deformation(totalDistance));

        let ratio = totalDeformation/totalDistance;
        let newX = (1-ratio)*coordinate.x + ratio*this.x;
        let newY = (1-ratio)*coordinate.y + ratio*this.y;

        return {  ratio: deformation(totalDistance)/totalDistance, coordinate: { x: newX, y: newY } };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}