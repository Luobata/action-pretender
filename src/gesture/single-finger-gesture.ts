/**
 * @desc single-finger-gesture
 */

import EventAction from '../action/pc';
import Gesture from './gesture';

export default abstract class SingleFingerGesture extends Gesture {
    protected Action: EventAction;

    constructor(x: number, y: number) {
        super();

        this.getAction(x, y);
    }

    abstract mockEvent(): void;

    protected getAction(x: number, y: number): void {
        this.Action = new EventAction(x, y);
    }
}
