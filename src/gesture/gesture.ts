/**
 * @desc 手势父类
 */
import CommonEventAction from '../action/common-event-action';

export default abstract class Gesture {
    constructor() {}

    protected Action: CommonEventAction;

    public start(): void {
        this.mockEvent();
    }

    protected abstract getAction(x: number, y: number): void;

    // protected abstract getAction(): void;

    abstract mockEvent(): void;

    abstract mockEvent(x: number, y: number): void;
}
