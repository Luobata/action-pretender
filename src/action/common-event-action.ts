/**
 * @desc common event action
 */

import Finger from './finger';

export default class CommonEventAction {
    protected _action: { t: number; cb: Function }[] = [];
    // 是否有进行中的action标志位
    protected _actionIng: boolean = false;
    protected _x: number;
    protected _y: number;
    protected _currentTarget: Element;

    /**
     * 根据finger获取元素
     *
     * @param finger finger
     * @returns Element
     */
    protected _getElByFinger(finger: Finger): Element {
        return this._getEl(finger.x, finger.y);
    }
    /**
     * 获取当前坐标元素
     */
    protected _getEl(x?: number, y?: number): Element {
        // 防止0漏了
        const el = document.elementFromPoint(
            x !== undefined ? x : this._x,
            y !== undefined ? y : this._y,
        );

        return el;
    }

    protected _triggerEvent(event: Event, target?: Element): void {
        let t = target || this._currentTarget;
        if (!t) {
            return;
        }

        t.dispatchEvent(event);
    }
}
