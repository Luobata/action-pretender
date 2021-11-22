/**
 * @desc click实例
 * 针对pc用户点击
 */

import SingleFingerGesture from './single-finger-gesture';

export default class extends SingleFingerGesture {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public mockEvent(): void {
        const el = document.elementFromPoint(this._x, this._y);

        const mousedown = new MouseEvent('mousedown', {
            clientX: this._x,
            clientY: this._y,
            movementX: 0,
            movementY: 0,
            // button: 0,
            // buttons: 0,
            relatedTarget: el,
        });
        const mouseup = new MouseEvent('mouseup', {
            clientX: this._x,
            clientY: this._y,
            movementX: 0,
            movementY: 0,
            // button: 0,
            // buttons: 0,
            relatedTarget: el,
        });

        el.dispatchEvent(mousedown);
        el.dispatchEvent(mouseup);
    }
}
