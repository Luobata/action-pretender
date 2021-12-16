/**
 * @desc 任何一个行为都是action的组合
 *
 * action 包括 点 拖 放 等（动词）
 */

import { Mouse, Pointer } from './event-util';

type moveAction = {
    x: number;
    y: number;
    stepTime: number;
};

/**
 * 暂时EventAction只设计pc交互操作，是否应该保证单例？
 */
export default class EventAction {
    // 起始坐标
    private _x: number;
    private _y: number;

    private _time: number;
    private _currentTarget: Element;

    private _moveAction: moveAction[] = [];

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;

        this._time = new Date().getTime();
    }

    /**
     * 左键
     */
    public down(): EventAction {
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

        return this;
    }

    /**
     * 点击右键 右键不考虑按下与松开两个状态
     * 因为右键左键按下组合比较复杂并且实用性不高，暂时不考虑左右组合按下场景
     * 即如果down状态没有up，触发contextmenu先触发up
     */
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

    /**
     * 松开左键
     */
    public up(): EventAction {
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
            }
        }

        this._currentTarget = null;

        return this;
    }

    /**
     * 从 { this._x this._y } 到目标x，y之间线性移动
     * @param x
     * @param y
     * @param t 移动时间 默认1s
     * @returns
     */
    public move(x: number, y: number, t: number = 1000): EventAction {
        // TODO 考虑如果一次移动没有结束时再次移动怎么处理
        if (this._moveAction.length) {
            this._forceStopMove();
        }

        // 按照距离拆分 基本上1-2px为一个单位 来保证不会错过事件
        // 按照固定分割分成多个任务
        const dis2 = Math.sqrt(
            Math.pow(this._x - x, 2) + Math.pow(this._y - y, 2),
        );
        const stepLen = 2;
        const step = Math.floor(dis2 / stepLen);
        const stepTime = t / step;
        for (let i: number = 0; i < step; i++) {
            // TODO 是否需要取整？
            this._moveAction.push({
                x: ((x - this._x) / step) * i + this._x,
                y: ((y - this._y) / step) * i + this._y,
                stepTime,
            });
        }

        // 其实只有不相等一种可能
        if (dis2 / stepLen > step) {
            this._moveAction.push({
                x,
                y,
                stepTime,
            });
        }

        if (this._moveAction.length) {
            this._generateMove();
        }

        return this;
    }

    /**
     * 滚轮滚动
     */
    public scroll(): EventAction {
        // TODO

        return this;
    }

    /**
     * 停留
     * @param t 时间 单位ms
     */
    public sleep(t: number): EventAction {
        this._time += t;
        // TODO 等待t时间

        return this;
    }

    /**
     * 根据moveAction队列来触发事件
     */
    private _generateMove(): void {
        if (this._moveAction.length) {
            const action = this._moveAction.shift();
            // 处理move in out over之类的

            const el = this._getEl(action.x, action.y);

            // 顺序是 旧节点move out leave 新节点over enter move

            if (el !== this._currentTarget) {
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

                const mouseover = Mouse('mouseout', action.x, action.y, el);
                const mouseenter = Mouse('mouseleave', action.x, action.y, el);
                const mousemove = Mouse('mousedown', action.x, action.y, el, {
                    movementX: action.x - this._x,
                    movementY: action.y - this._y,
                });

                this._triggerEvent(mouseover, el);
                this._triggerEvent(mouseenter, el);
                this._triggerEvent(mousemove, el);

                this._currentTarget = el;
            } else {
                const mousemove = Mouse(
                    'mousedown',
                    action.x,
                    action.y,
                    this._currentTarget,
                    {
                        movementX: action.x - this._x,
                        movementY: action.y - this._y,
                    },
                );
                this._triggerEvent(mousemove, this._currentTarget);
            }

            // 执行完再setTimeout保证不会有任务被取消了还在异步中被执行到
            setTimeout(() => {
                this._generateMove();
            }, action.stepTime);
        }
    }

    // 用来提前终止move
    private _forceStopMove(): void {
        // 清空队列
        this._moveAction = [];
    }

    /**
     * 获取当前坐标元素
     */
    private _getEl(x?: number, y?: number): Element {
        // 防止0漏了
        const el = document.elementFromPoint(
            x === undefined ? x : this._x,
            y === undefined ? y : this._y,
        );

        return el;
    }

    private _triggerEvent(event: Event, target?: Element): void {
        let t = target || this._currentTarget;
        if (!t) {
            return;
        }

        t.dispatchEvent(event);
    }
}
