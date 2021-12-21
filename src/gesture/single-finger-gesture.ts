/**
 * @desc single-finger-gesture
 */

import EventAction from '../action';
import Gesture from './gesture';

export default abstract class SingleFingerGesture extends Gesture {
    constructor(x: number, y: number) {
        super(x, y);
    }

    protected getAction(x: number, y: number): void {
        this.Action = new EventAction(x, y);
    }
}
