class Utils {

    static calculateLineAngle(initialPoint, finalPoint) {
        let slope = (finalPoint.y - initialPoint.y)/(finalPoint.x - initialPoint.y);
        return Math.atan(slope)/(Math.PI/180);
    }

}