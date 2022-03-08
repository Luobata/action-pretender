/**
 * @desc multi-finger-gesture
 */

import mobile from '../action/mobile';
import Gesture from './gesture';

export default abstract class MultiFingerGesture extends Gesture {
    protected Action: mobile;

    constructor() {
        super();
    }

    protected getAction(): void {
        this.Action = new mobile();
    }

    abstract mockEvent(x: number, y: number): void;
}
