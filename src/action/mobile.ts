/**
 * @desc mobile action
 */

import CommonEventAction from './common-event-action';

/**
 * mobile action
 * 可以有多个手指
 * 怎么兼容多个手指的行为？
 */
export default class MobileAction extends CommonEventAction {
    constructor() {
        super();
    }

    // 手指按下
    public down(t: number = 50): MobileAction {
        return this;
    }

    public off(t: number = 50): MobileAction {
        return this;
    }

    public move(t: number = 50): MobileAction {
        return this;
    }
}
