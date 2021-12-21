/**
 * @description action-prentender 入口文件
 */
import Click from './gesture/click';
import Dblclick from './gesture/dblclick';

export function click(x: number, y: number): void {
    new Click(x, y);
}
export function dblclick(x: number, y: number): void {
    new Dblclick(x, y);
}

export function tap(x: number, y: number): void {}
