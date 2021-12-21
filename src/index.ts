/**
 * @description action-prentender 入口文件
 */
import Click from './gesture/click';
import Dblclick from './gesture/dblclick';
import Move from './gesture/move';

export function click(x: number, y: number): void {
    new Click(x, y).start();
}
export function dblclick(x: number, y: number): void {
    new Dblclick(x, y).start();
}
export function move(x1: number, y1: number, x2: number, y2: number): void {
    // move
    new Move(x1, y1, x2, y2).start();
}

export function tap(x: number, y: number): void {}
