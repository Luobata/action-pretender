/**
 * @desc finger对象(只针对mobile)
 */

import { Pointer, sTouch } from '../event-util';
import MobileAction from './mobile';

// globalFingerId 用来在父容器中行程map 不能重复
let fingerId: number = 0;

export default class Finger {
    public x: number;
    public y: number;
    public id: number = fingerId++;

    protected _currentTarget: Element;
    protected _lastTarget: Element;
    private _action: { t: number; cb: Function }[] = [];
    // 是否有进行中的action标志位
    private _actionIng: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // TODO 把pc.ts里面一些相似方法移植过来
    public down(t: number): Finger {
        this._sleep(t, this._down);

        return this;
    }

    public off(t: number): Finger {
        this._sleep(t, this._up);

        return this;
    }

    public move(x: number, y: number, t: number = 1000): Finger {
        // 按照距离拆分 基本上1-2px为一个单位 来保证不会错过事件
        // 按照固定分割分成多个任务
        const dis2 = Math.sqrt(
            Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2),
        );
        const stepLen = 2;
        const step = Math.floor(dis2 / stepLen);
        const stepTime = t / step;
        for (let i: number = 0; i < step; i++) {
            // TODO 是否需要取整？
            this._sleep(stepTime, () => {
                this._move(
                    ((x - this.x) / step) * i + this.x,
                    ((y - this.y) / step) * i + this.y,
                    stepTime,
                );
            });
        }

        // 其实只有不相等一种可能
        if (dis2 / stepLen > step) {
            this._sleep(stepTime, () => {
                this.move(x, y, stepTime);
            });
        }

        return this;
    }

    private _down(): void {
        // 真实的down
        this._currentTarget = this._getEl();
        if (this._currentTarget) {
            const pointerdown = Pointer('pointerdown', this.x, this.y, 0.5);
            const touchstart = sTouch(
                'touchstart',
                this.x,
                this.y,
                this._currentTarget,
            );

            this._triggerEvent(pointerdown);
            this._triggerEvent(touchstart);
        }
    }

    private _up(): void {
        const el = this._getEl();

        if (this._lastTarget) {
            // TODO touchend 只有changedTouches 没有touches
            const touchend = sTouch(
                'touchend',
                this.x,
                this.y,
                this._currentTarget,
            );

            this._triggerEvent(touchend);

            this._currentTarget = null;
        }
        // TODO 真实的移动端是否有click要试一下
    }

    // 对应的的touch事件合成相关
    private _move(x: number, y: number, t: number): void {
        if (this._currentTarget) {
            // 有cureent一定触发过start
            const pointerdown = Pointer('pointerdown', this.x, this.y, 0.5);
            const touchmove = sTouch('touchmove', x, y, this._currentTarget);

            this._triggerEvent(touchmove, this._currentTarget);
        }
    }

    // 这些方法应该在Finger对象上，后续对pc做一个基于finger的抽象
    protected _getElByFinger(finger: Finger): Element {
        return this._getEl(finger.x, finger.y);
    }
    /**
     * 获取当前坐标元素
     */
    protected _getEl(x?: number, y?: number): Element {
        // 防止0漏了
        const el = document.elementFromPoint(
            x !== undefined ? x : this.x,
            y !== undefined ? y : this.y,
        );

        return el;
    }

    private _sleep(t: number, cb: Function): void {
        // TODO 是否需要同步this.time
        this._action.push({ t, cb });
        this._doAction();
    }

    private _doAction(): void {
        if (this._actionIng) {
            return;
        } else if (this._action.length) {
            const action = this._action.shift();
            this._actionIng = true;
            setTimeout(() => {
                action.cb.call(this);
                this._actionIng = false;
                this._doAction();
            }, action.t);
        }
    }

    private _triggerEvent(event: Event, target?: Element): void {
        let t = target || this._currentTarget;
        if (!t) {
            return;
        }

        t.dispatchEvent(event);
    }
}
