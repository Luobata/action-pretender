/**
 * @desc single-finger-gesture
 */

import EventAction from '../action';
import Gesture from './gesture';

export default abstract class SingleFingerGesture extends Gesture {
    protected _x: number;
    protected _y: number;

    protected Action: EventAction;

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this.Action = new EventAction(this._x, this._y);
    }
}
