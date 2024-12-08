class Board {
     constructor() {
        this.cells = Array(13).fill(Array(13).fill(0)).map((column, i) => column.map((cell, j) => new Cell(canvasWidth/13, canvasHeight/13, i, j)));
     }

     update() {
        this.cells.forEach(cellRow => cellRow.forEach(cell => cell.filterBodies()));
     }

     checkForCollisions() {
        this.cells.flat().filter(cell => cell.bodies.length > 0)
            .map(cell => cell.checkForCollisions(cell.getNeighbouringCells(this.cells.flat()).map(c => c.bodies).flat()));
     }
}

class Cell {
    constructor(width, height, horizontalIndex, verticalIndex) {
        this.startingX = width * horizontalIndex;
        this.endX = this.startingX + width;
        this.startingY = height * verticalIndex;
        this.endY = this.startingY + height;
    }

    filterBodies() {
        this.bodies = bodies.filter(body => body.x < this.endX && body.x >= this.startingX && body.y < this.endY && body.y >= this.startingY);
    }

    getNeighbouringCells(allCells) {
        const includedIndexes = [this.horizontalIndex, this.horizontalIndex+1, this.horizontalIndex-1, this.verticalIndex, this.verticalIndex-1, this.verticalIndex+1]
        return allCells
            .filter(cell => cell !== this)
            .filter(cell => includedIndexes.includes(cell.horizontalIndex) && includedIndexes.includes(cell.verticalIndex));
    }

    checkForCollisions(neighbouringBodies) {
        const allBodies = [this.bodies, neighbouringBodies].flat().filter(b => b.traceCache.length > 0);
        allBodies.forEach(body => {
            allBodies.filter(secondBody => secondBody != body)
                // && Math.abs(body.x - secondBody.x) < Utils.getRadiusForBody(body) &&
                // Math.abs(body.y - secondBody.y) < Utils.getRadiusForBody(body))
                .some(secondBody => {    
                    let firstBodyVisualPosition = body.traceCache[body.traceCache.length-1];
                    let firstBodyRadius = Utils.getRadiusForBody(body);
                    let secondBodyVisualPosition = secondBody.traceCache[secondBody.traceCache.length-1];
                    let secondBodyRadius = Utils.getRadiusForBody(secondBody);
                    let distance = Math.sqrt((firstBodyVisualPosition.x - secondBodyVisualPosition.x)**2 + (firstBodyVisualPosition.y - secondBodyVisualPosition.y)**2);
                    if (distance < firstBodyRadius || distance < secondBodyRadius) {
                        let biggerBody = body.mass > secondBody.mass ? body : secondBody;
                        bodies.splice(bodies.indexOf(body), 1);
                        bodies.splice(bodies.indexOf(secondBody), 1);
                        allBodies.splice(allBodies.indexOf(body), 1);
                        allBodies.splice(allBodies.indexOf(secondBody), 1);
    
                        let totalMass = body.mass + secondBody.mass;
                        let fusedBody = new CelestialBody(    
                            (body.x*body.mass+secondBody.x*secondBody.mass)/totalMass, (body.y*body.mass+secondBody.y*secondBody.mass)/totalMass,
                            { 
                                vx: (body.speed.vx*body.mass + secondBody.speed.vx*secondBody.mass)/totalMass,
                                vy: (body.speed.vy*body.mass + secondBody.speed.vy*secondBody.mass)/totalMass
                            }, 
                            body.mass + secondBody.mass
                        );
                        fusedBody.color = biggerBody.color;
                        bodies.push(fusedBody);
                        allBodies.push(fusedBody);
                        return true;
                    }
                });
        });
    }
}