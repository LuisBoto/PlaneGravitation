class Particle {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.orientation = 0;
        this.color = Utils.getRandomColor();
    }

    update() {
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    updateSpeedVectors(traslatedCoordinate) {
        let newAngle = Utils.calculateLineAngle({ x: this.x, y: this.y }, traslatedCoordinate);
        let rotationAngle = newAngle - this.orientation;

        let horizontalVX = this.speed.vx * Math.cos(rotationAngle*(Math.PI/180));
        let verticalVX = this.speed.vx * Math.sin(rotationAngle*(Math.PI/180));
        let horizontalVY = this.speed.vy * Math.cos((90+rotationAngle)*(Math.PI/180));
        let verticalVY = this.speed.vy * Math.sin((90+rotationAngle)*(Math.PI/180));

        this.speed.vx = horizontalVX + horizontalVY;
        this.speed.vy = verticalVX + verticalVY;
        this.orientation += rotationAngle;
    }

    draw(traslatedCoordinate) {
        this.updateSpeedVectors(traslatedCoordinate); 
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, 5, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, 3, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();    

        /*ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText('Vx: ' + this.speed.vx, traslatedCoordinate.x + 10, traslatedCoordinate.y);
        ctx.fillText('Vy: ' + this.speed.vy, traslatedCoordinate.x - 5, traslatedCoordinate.y + 15);*/
    }
}