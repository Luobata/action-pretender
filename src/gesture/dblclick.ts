/**
 * @desc dblclick
 * pc用户
 */

import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public mockEvent(): void {
        this.Action.down().up().down().up();
    }
}
