/**
 * @desc finger对象
 */

// globalFingerId
let fingerId: number = 0;

export default class Finger {
    public x: number;
    public y: number;
    public id: number = fingerId++;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public down(t: number): Finger {
        return this;
    }
    public off(t: number): Finger {
        return this;
    }
}
