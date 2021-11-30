/**
 * @desc single-finger-gesture
 */

import Gesture from './gesture';

export default abstract class SingleFingerGesture extends Gesture {
    protected _x: number;
    protected _y: number;

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;
    }
}
