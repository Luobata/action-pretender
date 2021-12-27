/**
 * @desc common event action
 */

export default class CommonEventAction {
    protected _x: number;
    protected _y: number;
    protected _currentTarget: Element;
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
