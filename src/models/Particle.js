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
        let rotationAngle = (newAngle - this.orientation);

        let horizontalVX = this.speed.vx * Math.cos(rotationAngle*(Math.PI/180));
        let verticalVX = this.speed.vx * Math.sin(rotationAngle*(Math.PI/180));
        let horizontalVY = this.speed.vy * Math.cos((90+rotationAngle)*(Math.PI/180));
        let verticalVY = this.speed.vy * Math.sin((90+rotationAngle)*(Math.PI/180));

        this.speed.vx = horizontalVX + horizontalVY;
        this.speed.vy = verticalVX + verticalVY;
        this.orientation += rotationAngle;
    }

    normalizeTraslatedCoordinates(coordinates) {
        let maxDeformationRatio = Math.max(...(coordinates.map(c => c.ratio)));
        if(coordinates.length == 1 || maxDeformationRatio == 0 || !isFinite(maxDeformationRatio)) {
            return coordinates.filter(c => c.ratio == maxDeformationRatio || !isFinite(c.ratio))[0].trueCoordinate;
        }

        let totalWeights = coordinates.map(c => c.ratio).reduce((total, weight) => total + weight, 0);
        let xVariation = coordinates.map(c => c.trueCoordinate.x*c.ratio).reduce((totalDistances, distance) => totalDistances + distance, 0)/totalWeights;
        let yVariation = coordinates.map(c => c.trueCoordinate.y*c.ratio).reduce((totalDistances, distance) => totalDistances + distance, 0)/totalWeights;
        return { 
            x: xVariation, 
            y: yVariation 
        };
    }

    draw(traslatedCoordinates) {
        let traslatedCoordinate = this.normalizeTraslatedCoordinates(traslatedCoordinates);
        if (traslatedCoordinate == null) {
            console.log("traslation skip");
            return;
        }
    
        this.updateSpeedVectors(traslatedCoordinate); 
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, 5, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, 3, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();    

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        //ctx.fillText('Degress: ' + this.orientation, traslatedCoordinate.x, traslatedCoordinate.y+20);
       // ctx.fillText('VX: ' + this.x, traslatedCoordinate.x + 20, traslatedCoordinate.y);        
        //ctx.fillText('VY: ' + this.y, traslatedCoordinate.x, traslatedCoordinate.y-20);
    }
}