class CelestialBody {

    constructor(x, y, speed, mass) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.orientation = 0;
        this.color = Utils.getRandomColor();
        this.mass = mass;

        this.traceCache = [];
    }

    update() {
        this.x += this.speed.vx;
        this.y += this.speed.vy;
    }

    traslateCoordinate(executionStart, affectedBody) {
        let deltaTime = ((Date.now() - executionStart) / 10000)**2;
        let deformation = (distance) => {
            if (distance <= 0) return 0;
            let actualDeformation = (this.mass*distance)/(distance**2) * deltaTime;
            return actualDeformation;
        };

        let distanceX = this.x - affectedBody.x;        
        let distanceY = this.y - affectedBody.y;
        let totalDistance = Math.sqrt(distanceX**2 + distanceY**2);

        let totalDeformation = deformation(totalDistance);

        let trueDeformation = Math.min(totalDistance, totalDeformation);
        let ratio = trueDeformation/totalDistance;
        let trueX = (1-ratio)*affectedBody.x + ratio*this.x;
        let trueY = (1-ratio)*affectedBody.y + ratio*this.y;

        return {  
            ratio: 1.1**totalDeformation,
            trueCoordinate: { x: trueX, y: trueY }
        };
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
        if (coordinates.length == 1)
            return coordinates[0].trueCoordinate;
        if(maxDeformationRatio == 0 || !isFinite(maxDeformationRatio)) 
            return coordinates.filter(c => c.ratio == maxDeformationRatio || !isFinite(c.ratio))[0].trueCoordinate;
        

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
            return console.log("traslation skip");
        }    
        this.updateSpeedVectors(traslatedCoordinate); 
        this.traceCache.push(traslatedCoordinate);
        this.drawTrace();

        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, this.mass*0.0001+16, 0, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(traslatedCoordinate.x, traslatedCoordinate.y, this.mass*0.0001+14, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();    

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        //ctx.fillText('Degress: ' + this.orientation, traslatedCoordinate.x, traslatedCoordinate.y+20);
       // ctx.fillText('VX: ' + this.x, traslatedCoordinate.x + 20, traslatedCoordinate.y);        
        //ctx.fillText('VY: ' + this.y, traslatedCoordinate.x, traslatedCoordinate.y-20);
    }

    drawTrace() {
        if (this.traceCache.length < 5) 
            return;
        for (let i = this.traceCache.length-1; i > this.traceCache.length-5; i--) {
            ctx.beginPath();
            ctx.arc(this.traceCache[i].x, this.traceCache[i].y, 14, 0, 2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();    
        }
    }
}