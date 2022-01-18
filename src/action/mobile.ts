/**
 * @desc mobile action
 */

import CommonEventAction from './common-event-action';
import Finger from './finger';

/**
 * mobile action
 * 可以有多个手指
 * 怎么兼容多个手指的行为？比如双指移动
 */
export default class MobileAction extends CommonEventAction {
    private fingerMap: Map<number, Finger> = new Map();

    constructor() {
        super();
    }

    public generateFinger(x: number, y: number): Finger {
        const finger = new Finger(x, y);
        this.fingerMap.set(finger.id, finger);

        return finger;
    }

    // TODO 怎么可以把这些函数直接代理过去
    // 手指按下
    public down(fingerId: number | Finger, t: number = 50): MobileAction {
        this._getFinger(fingerId).down(t);

        return this;
    }

    public off(fingerId: number | Finger, t: number = 50): MobileAction {
        this._getFinger(fingerId).off(t);

        return this;
    }

    public move(
        fingerId: number | Finger,
        x: number,
        y: number,
        t: number = 50,
    ): MobileAction {
        this._getFinger(fingerId).move(x, y, t);

        return this;
    }

    private _getFinger(fingerId: number | Finger): Finger {
        let finger: Finger;
        if (typeof fingerId === 'number') {
            // TODO 是否需要判断finger是否还存在？
            finger = this.fingerMap.get(fingerId);
        } else {
            finger = fingerId;
        }

        if (!finger) {
            throw new Error('not found correct finger');
        }

        return finger;
    }
}
