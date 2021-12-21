/**
 * @desc 手势父类
 */
import EventAction from '../action';

export default abstract class Gesture {
    constructor(x: number, y: number) {
        this.getAction(x, y);
        this.mockEvent();
    }

    protected Action: EventAction;

    protected abstract getAction(x: number, y: number): void;

    // protected abstract getAction(): void;

    abstract mockEvent(): void;
}
