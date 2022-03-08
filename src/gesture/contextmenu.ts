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
        this.Action.contextmenu();
    }
}
