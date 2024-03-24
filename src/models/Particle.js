class Particle {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.orientation = 0;
        this.lastTraslatedCoordinate = { x: x, y: y };
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

    normalizeTraslatedCoordinates(coordinates) {

        coordinates.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.trueCoordinate.x, c.trueCoordinate.y, 5, 0, 2*Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        });

        let maxDeformationRatio = Math.max(...(coordinates.map(c => c.ratio)));
        console.log(maxDeformationRatio);
        if(coordinates.length == 1 || maxDeformationRatio == 0 || !isFinite(maxDeformationRatio))
            return coordinates.filter(c => c.ratio == maxDeformationRatio)[0].trueCoordinate;

        coordinates = coordinates.map(c => {
            c.ratio = (c.ratio/maxDeformationRatio);
            return c;
        });
        console.log(coordinates.map(c => c.ratio));


        let totalWeights = coordinates.map(c => c.ratio).reduce((total, weight) => total + weight, 0);
        let xVariation = coordinates.map(c => c.trueCoordinate.x*c.ratio).reduce((totalDistances, distance) => totalDistances + distance, 0)/totalWeights;
        let yVariation = coordinates.map(c => c.trueCoordinate.y*c.ratio).reduce((totalDistances, distance) => totalDistances + distance, 0)/totalWeights;
        //console.log("x: " + xVariation + " max: " + maxTrueX + " min: " + minTrueX + "\n y: " + yVariation + " max: " + maxTrueY + " min: " + minTrueY)
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
        this.lastTraslatedCoordinate = traslatedCoordinate;

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