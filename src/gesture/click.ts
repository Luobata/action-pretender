/**
 * @desc click实例
 * 针对pc用户点击
 */

import { Mouse, Pointer } from '../event-util';
import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public mockEvent(): void {
        const el = document.elementFromPoint(this._x, this._y);

        const pointerdown = Pointer('pointerdown', this._x, this._y, 0.5);
        const pointerup = Pointer('pointerup', this._x, this._y, 0);
        const click = Pointer('click', this._x, this._y, 0);
        const mousedown = Mouse('mousedown', this._x, this._y, el);
        const mouseup = Mouse('mouseup', this._x, this._y, el);

        el.dispatchEvent(pointerdown);
        el.dispatchEvent(mousedown);
        el.dispatchEvent(pointerup);
        el.dispatchEvent(mouseup);
        el.dispatchEvent(click);
    }
}
