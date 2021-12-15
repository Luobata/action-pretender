/**
 * @desc 任何一个行为都是action的组合
 *
 * action 包括 点 拖 放 等（动词）
 */

import { Mouse, Pointer } from './event-util';

export default class EventAction {
    // 起始坐标
    private _x: number;
    private _y: number;

    private _time: number;
    private _currentTarget: Element;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;

        this._time = new Date().getTime();
    }

    // 左键
    public down(): EventAction {
        // TODO
        this._currentTarget = this._getEl();
        if (this._currentTarget) {
            const pointerdown = Pointer('pointerdown', this._x, this._y, 0.5);
            const mousedown = Mouse(
                'mousedown',
                this._x,
                this._y,
                this._currentTarget,
            );

            this._triggerEvent(pointerdown);
            this._triggerEvent(mousedown);
        }

        return this;
    }

    // 右键
    // 因为右键左键按下组合比较复杂并且实用性不高，暂时不考虑左右组合按下场景
    // 即 如果down状态没有up，触发contextmenu先触发up
    public contextmenu(): EventAction {
        // TODO
        if (this._currentTarget) {
            this.up();
        }
        const el = this._getEl();
        if (el) {
            const pointerdown = Pointer('pointerdown', this._x, this._y, 0.5);
            const mousedown = Mouse(
                'mousedown',
                this._x,
                this._y,
                this._currentTarget,
            );
            const contextmenu = Pointer('contextmenu', this._x, this._y, 0);
            this._triggerEvent(pointerdown);
            this._triggerEvent(mousedown);
            this._triggerEvent(contextmenu);
        }

        return this;
    }

    // 松开
    public up(): EventAction {
        const el = this._getEl();
        if (el) {
            const pointerup = Pointer('pointerup', this._x, this._y, 0);
            const mouseup = Mouse('mouseup', this._x, this._y, el);

            this._triggerEvent(pointerup);
            this._triggerEvent(mouseup);
            if (this._currentTarget === el) {
                const click = Pointer('click', this._x, this._y, 0);
                this._triggerEvent(click);
            }
        }

        this._currentTarget = null;

        return this;
    }

    public move(): EventAction {
        // TODO
        return this;
    }

    public sleep(): EventAction {
        // TODO
        return this;
    }

    /**
     * 获取当前坐标元素
     */
    private _getEl(): Element {
        const el = document.elementFromPoint(this._x, this._y);

        return el;
    }

    private _triggerEvent(event: Event): void {
        if (!this._currentTarget) {
            return;
        }

        this._currentTarget.dispatchEvent(event);
    }
}
