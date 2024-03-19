class Particle {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.orientation = Utils.calculateLineAngle({ x: this.x, y: this.y }, { x: this.x+this.speed.vx, y: this.y+this.speed.vy });
    }

    update() {
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    updateSpeedVectors(traslatedCoordinate) {
        let newAngle = Utils.calculateLineAngle({ x: this.x, y: this.y }, traslatedCoordinate);
        let rotationAngle = newAngle - this.orientation;
        
        console.log("new angle: " + newAngle + " orientation: " + this.orientation);

        let horizontalVX = this.speed.vx * Math.cos(rotationAngle);
        let verticalVX = this.speed.vx * Math.sin(rotationAngle);
        let horizontalVY = this.speed.vy * Math.cos(rotationAngle);
        let verticalVY = this.speed.vy * Math.sin(rotationAngle);

        this.speed.vx = horizontalVX + horizontalVY;
        this.speed.vy = verticalVX + verticalVY;
        //this.speed.vx = Math.trunc(this.speed.vx*1000)/1000;
        //this.speed.vy = Math.trunc(this.speed.vy*1000)/1000;
        this.orientation = newAngle;
    }

    draw(traslatedCoordinate) {
        this.updateSpeedVectors(traslatedCoordinate);
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, 3, 0, 2*Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText('Vx: ' + this.speed.vx, traslatedCoordinate.x + 10, traslatedCoordinate.y);
        ctx.fillText('Vy: ' + this.speed.vy, traslatedCoordinate.x - 5, traslatedCoordinate.y + 15);
    }
}