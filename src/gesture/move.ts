/**
 * @desc move
 * pc
 */

import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    private _x2: number;
    private _y2: number;

    constructor(x: number, y: number, x2: number, y2: number) {
        super(x, y);

        this._x2 = x2;
        this._y2 = y2;
    }

    public mockEvent(): void {
        // nothing
        this.Action.move(this._x2, this._y2);
    }

    public moveTo(x: number, y: number, t?: number): void {}
}
