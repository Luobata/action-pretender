/**
 * @desc event模拟
 */

export function mouse(
    type: string,
    eventInitDict?: MouseEventInit,
): MouseEvent {
    return new MouseEvent(type, eventInitDict);
}
