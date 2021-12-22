/**
 * @desc move
 * pc
 */

import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    private _dis: number;

    constructor(x: number, y: number, dis: number) {
        super(x, y);

        this._dis = dis;
    }

    public mockEvent(): void {
        // nothing
        this.Action.scroll(this._dis);
    }
}
