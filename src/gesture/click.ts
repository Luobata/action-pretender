/**
 * @desc 鼠标左键点击
 * 针对pc用户点击
 */

import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public mockEvent(): void {
        this.Action.down().up();
    }
}
