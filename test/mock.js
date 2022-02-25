import { click, dblclick, move } from '../src';

const events = [
    'dblclick',
    'click',
    'mousedown',
    'mouseup',
    'pointerup',
    'pointerdown',

    'touchstart',
    'touchend',
    'touchmove',
    'touchcancel',
    'contextmenu',

    'mousemove',
    'mouseenter',
    'mouseover',
    'mouseleave',
    'mouseout',
];

const app = document.getElementById('app');
const app2 = document.getElementById('app2');

events.forEach((t) => {
    app.addEventListener(t, (e) => {
        console.log('red', t, e);
    });
    app2.addEventListener(t, (e) => {
        console.log('blue', t, e);
    });
});

// test coding

window['test'] = {
    // window.test.click(74, 35)
    click: (x, y) => {
        click(x, y);
    },
    // window.test.dblclick(74, 35)
    dblclick: (x, y) => {
        dblclick(x, y);
    },
    // window.test.move(60, 94, 76, 121)
    move: (x1, y1, x2, y2) => {
        move(x1, y1, x2, y2);
    },
};

console.log(1234);
