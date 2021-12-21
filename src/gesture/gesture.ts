/**
 * @desc 手势父类
 */
import EventAction from '../action';

export default abstract class Gesture {
    protected Action: EventAction;

    abstract mockEvent(): void;
}
