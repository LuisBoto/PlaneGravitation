class Utils {

    static calculateLineAngle(initialPoint, finalPoint) {
        return Math.atan2(finalPoint.y - initialPoint.y, finalPoint.x - initialPoint.x)/(Math.PI/180);
    }

}