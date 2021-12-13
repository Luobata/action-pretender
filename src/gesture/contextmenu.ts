/**
 * @desc 鼠标右键事件
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
        const mousedown = Mouse('mousedown', this._x, this._y, el);
        const contextmenu = Pointer('contextmenu', this._x, this._y, 0);

        el.dispatchEvent(pointerdown);
        el.dispatchEvent(mousedown);
        el.dispatchEvent(contextmenu);
    }
}
