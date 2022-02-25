/**
 * @desc 一个手指按下
 * 针对mobile用户
 */

import MultiFingerGesture from '../multi-finger-gesture';

export default class extends MultiFingerGesture {
    constructor() {
        super();
    }

    // 怎么or呢
    public mockEvent(x: number, y: number): void {
        const finger = this.Action.generateFinger(x, y);

        // TODO这里可以改成链式调用么
        this.Action.down(finger);
        this.Action.off(finger);
    }
}
