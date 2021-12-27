/**
 * @desc 任何一个行为都是action的组合
 *
 * action 包括 点 拖 放 等（动词）
 */

import CommonEventAction from '../common-event-action';
import { Mouse, Pointer } from '../event-util';

type moveAction = {
    x: number;
    y: number;
    stepTime: number;
};

/**
 * 暂时EventAction只设计pc交互操作，是否应该保证单例？
 */
export default class EventAction extends CommonEventAction {
    // 起始坐标

    private _time: number;

    private _action: { t: number; cb: Function }[] = [];
    // 是否有进行中的action标志位
    private _actionIng: boolean = false;

    private _lastClickTime: number;
    private _minDblclickTime: number = 200;

    constructor(x: number, y: number) {
        super();
        this._x = x;
        this._y = y;

        this._time = new Date().getTime();
    }

    /**
     * 左键
     */
    public down(t: number = 50): EventAction {
        // TODO delay
        this._sleep(t, this._down);

        return this;
    }

    /**
     * 点击右键 右键不考虑按下与松开两个状态
     * 因为右键左键按下组合比较复杂并且实用性不高，暂时不考虑左右组合按下场景
     * 即如果down状态没有up，触发contextmenu先触发up
     */
    public contextmenu(t: number = 50): EventAction {
        // TODO
        // 两个delay怎么兼容
        // sleep 传cb
        if (this._currentTarget) {
            this.up();
        }
        this._sleep(t, this._contextMenu);

        return this;
    }

    /**
     * 松开左键
     */
    public up(t: number = 50): EventAction {
        // TODO delay
        this._sleep(t, this._up);

        return this;
    }

    /**
     * 从 { this._x this._y } 到目标x，y之间线性移动
     * @param x
     * @param y
     * @param t 移动时间 默认1s
     * @returns
     */
    public move(x: number, y: number, totaltime: number = 1000): EventAction {
        // TODO 考虑如果一次移动没有结束时再次移动怎么处理

        // 按照距离拆分 基本上1-2px为一个单位 来保证不会错过事件
        // 按照固定分割分成多个任务
        const dis2 = Math.sqrt(
            Math.pow(this._x - x, 2) + Math.pow(this._y - y, 2),
        );
        const stepLen = 2;
        const step = Math.floor(dis2 / stepLen);
        const stepTime = totaltime / step;
        for (let i: number = 0; i < step; i++) {
            // TODO 是否需要取整？
            this._sleep(stepTime, () => {
                this._generateMove({
                    x: ((x - this._x) / step) * i + this._x,
                    y: ((y - this._y) / step) * i + this._y,
                    stepTime,
                });
            });
        }

        // 其实只有不相等一种可能
        if (dis2 / stepLen > step) {
            this._sleep(stepTime, () => {
                this._generateMove({
                    x,
                    y,
                    stepTime,
                });
            });
        }

        return this;
    }

    /**
     * scroll可以认为是一种move 但是与move不同的是scroll过程中不触发元素的move事件
     * 暂时认为scroll只有y轴坐标的变化没有坐标scroll行为（其实可能有）
     * 滚轮滚动
     * @param dis       距离
     * @param totaltime scroll所需要的时间
     */
    public scroll(dis: number, totaltime: number = 1000): EventAction {
        const stepLen = 2;
        const step = Math.floor(dis / stepLen);
        const stepTime = totaltime / step;

        for (let i: number = 0; i < step; i++) {
            // TODO 是否需要取整？
            this._sleep(stepTime, () => {
                this._generateMove(
                    {
                        x: this._x,
                        y: (dis / step) * i + this._y,
                        stepTime,
                    },
                    false,
                );
            });
        }

        // 其实只有不相等一种可能
        if (dis / stepLen > step) {
            this._sleep(stepTime, () => {
                this._generateMove(
                    {
                        x: this._x,
                        y: this._y + dis,
                        stepTime,
                    },
                    false,
                );
            });
        }

        return this;
    }

    /**
     * 停留
     * @param t 时间 单位ms
     */
    public sleep(t: number): EventAction {
        this._time += t;
        // this._sleep(t)
        // TODO 等待t时间

        return this;
    }

    /**
     * 手动维护过程中的任务队列
     * @param t 延迟时间
     * @param cb cb方法一定是同步方法，如果是异步方法会使得任务队列错乱
     */
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

    private _contextMenu(): void {
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
    }

    private _down(): void {
        // TODO dblclick 如何兼容
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
    }

    private _up(): void {
        const el = this._getEl();
        if (el) {
            const pointerup = Pointer('pointerup', this._x, this._y, 0);
            const mouseup = Mouse('mouseup', this._x, this._y, el);

            this._triggerEvent(pointerup);
            this._triggerEvent(mouseup);
            // 如果down和up的节点相同才会触发click
            if (this._currentTarget === el) {
                const click = Pointer('click', this._x, this._y, 0);
                this._triggerEvent(click);

                const nowTime = new Date().getTime();
                if (
                    this._lastClickTime &&
                    nowTime - this._lastClickTime < this._minDblclickTime
                ) {
                    const dblclick = Pointer('dblclick', this._x, this._y, 0);
                    this._triggerEvent(dblclick);
                }

                this._lastClickTime = nowTime;
            }

            // 如果连续两次click之间时间间隔过短触发dblclick
        }

        this._currentTarget = null;
    }

    /**
     * 根据moveAction队列来触发事件
     * @param action moveAction
     * @param hasMove 是否触发movemove事件 scroll触发的move不触发
     */
    private _generateMove(action: moveAction, hasMove: boolean = true): void {
        // 处理move in out over之类的

        const el = this._getEl(action.x, action.y);

        // 顺序是 旧节点move out leave 新节点over enter move
        // BUG currentTarget为null的时候不应该触发over enter

        // currentTarget不能为null
        if (this._currentTarget && el !== this._currentTarget) {
            // 有一个是不冒泡的要注意下
            const mouseout = Mouse(
                'mouseout',
                action.x,
                action.y,
                this._currentTarget,
            );
            const mouseleave = Mouse(
                'mouseleave',
                action.x,
                action.y,
                this._currentTarget,
            );

            this._triggerEvent(mouseout);
            this._triggerEvent(mouseleave);

            const mouseover = Mouse('mouseover', action.x, action.y, el);
            const mouseenter = Mouse('mouseenter', action.x, action.y, el);
            const mousemove = Mouse('mousemove', action.x, action.y, el, {
                movementX: action.x - this._x,
                movementY: action.y - this._y,
            });

            this._triggerEvent(mouseover, el);
            this._triggerEvent(mouseenter, el);

            if (hasMove) {
                this._triggerEvent(mousemove, el);
            }

            this._currentTarget = el;
        } else {
            if (!this._currentTarget) {
                this._currentTarget = el;
            }
            const mousemove = Mouse(
                'mousemove',
                action.x,
                action.y,
                this._currentTarget,
                {
                    movementX: action.x - this._x,
                    movementY: action.y - this._y,
                },
            );
            if (hasMove) {
                this._triggerEvent(mousemove, this._currentTarget);
            }
        }
    }
}
