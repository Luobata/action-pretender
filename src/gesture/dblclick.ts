/**
 * @desc dblclick
 * pc用户
 */

import { Pointer } from '../event-util';
import click from './click';
import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    private _c1: click;
    private _c2: click;

    constructor(x: number, y: number) {
        super(x, y);

        this._c1 = new click(x, y);
        this._c2 = new click(x, y);
    }

    public mockEvent(): void {
        //
        this._c1.mockEvent();
        this._c2.mockEvent();

        const el = document.elementFromPoint(this._x, this._y);
        const click = Pointer('dblclick', this._x, this._y, 0);
        el.dispatchEvent(click);
    }
}
