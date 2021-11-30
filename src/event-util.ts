/**
 * @desc event模拟
 */

export function Mouse(
    type: string,
    x: number,
    y: number,
    target: MouseEventInit['relatedTarget'],
    eventInitDict?: MouseEventInit,
): MouseEvent {
    return new MouseEvent(type, {
        clientX: x,
        clientY: y,
        relatedTarget: target,
        ...eventInitDict,
    });
}



export function Pointer(
    type: string,
    x: number,
    y: number,
    pressure: number = 1,
    pointerId: number = 1,
    eventInitDict?: PointerEventInit,
): PointerEvent {
    return new PointerEvent(type, {
        tiltX: x,
        tiltY: y,
        pressure,
        pointerId
        ...eventInitDict,
    });
}

// single touch
export function sTouch(
    type: string,
    x: number,
    y: number,
    target: MouseEventInit['relatedTarget'],
    eventInitDict?: TouchEventInit,
): TouchEvent {
    const touch = new Touch({
        clientX: x, 
        clientY: y, 
        identifier: 0,
        target,
    });



    return new TouchEvent(type, {
        touches: [touch],
        changedTouches: [touch],
        targetTouches: [touch],
        ...eventInitDict,
    });
}