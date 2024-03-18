class BlackHole {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mass = 500;
    }

    update() {
    }

    traslateCoordinate(executionStart, coordinate) {
        let deltaTime = (Date.now() - executionStart) / 100;
        let deformation = (distance) => (distance != 0 ? (this.mass*distance)/(distance**2) : 0) * deltaTime;

        let distanceX = this.x - coordinate.x;
        let deformationX = deformation(distanceX);
        let newX = coordinate.x + (Math.abs(deformationX) > Math.abs(distanceX) ? distanceX : deformationX); 

        let distanceY = this.y - coordinate.y;
        let deformationY = deformation(distanceY);
        let newY = coordinate.y + (Math.abs(deformationY) > Math.abs(distanceY) ? distanceY : deformationY);
        return { x: newX, y: newY };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}