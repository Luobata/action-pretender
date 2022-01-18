/**
 * @desc finger对象(只针对mobile)
 */

// globalFingerId 用来在父容器中行程map 不能重复
let fingerId: number = 0;

export default class Finger {
    public x: number;
    public y: number;
    public id: number = fingerId++;

    private _action: { t: number; cb: Function }[] = [];
    // 是否有进行中的action标志位
    private _actionIng: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // TODO 把pc.ts里面一些相似方法移植过来
    public down(t: number): Finger {
        return this;
    }

    public off(t: number): Finger {
        return this;
    }

    public move(x: number, y: number, t: number = 1000): Finger {
        return this;
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
            x !== undefined ? x : this._x,
            y !== undefined ? y : this._y,
        );

        return el;
    }
}
