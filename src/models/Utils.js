class Utils {

    static calculateLineAngle(initialPoint, finalPoint) {
        return Math.atan2(finalPoint.y - initialPoint.y, finalPoint.x - initialPoint.x)/(Math.PI/180);
    }

    static getRandomColor() {
        let R = (Math.floor(Math.random() * 255)),
            G = (Math.floor(Math.random() * 255)),
            B = (Math.floor(Math.random() * 255));
        return 'rgb(' + R + ', ' + G + ',' + B + ')';
    }

    static getRadiusForBody(celestialBody) {
        return Math.sqrt(celestialBody.mass)*1.1+80;
    }

}