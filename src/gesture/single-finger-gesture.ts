/**
 * @desc single-finger-gesture
 */

export default abstract class SingleFingerGesture {
    protected _x: number;
    protected _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}
