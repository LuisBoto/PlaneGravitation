class BlackHole {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mass = 500;
    }

    update() {
    }

    traslateCoordinate(executionStart, coordinate) {
        let deltaTime = (Date.now() - executionStart) / 10000;
        let deformation = (distance) => {
            if (distance <= 0) return 0;
            let actualDeformation = (this.mass*distance)/(distance**2) * deltaTime;
            return Math.min(actualDeformation, distance);
        };

        let distanceX = this.x - coordinate.x;        
        let distanceY = this.y - coordinate.y;
        let totalDistance = Math.sqrt(distanceX**2 + distanceY**2);
        let totalDeformation = deformation(totalDistance);

        let t = totalDeformation/totalDistance;
        let newX = (1-t)*coordinate.x + t*this.x;
        let newY = (1-t)*coordinate.y + t*this.y;

        return { x: newX, y: newY };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}