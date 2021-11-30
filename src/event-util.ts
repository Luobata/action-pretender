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
): MouseEvent {
    return new PointerEvent(type, {
        tiltX: x,
        tiltY: y,
        pressure,
        pointerId
        ...eventInitDict,
    });
}