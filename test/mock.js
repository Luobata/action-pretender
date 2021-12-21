import { click } from "../src";

const events = [
    'dblclick',
    'click',
    'mousedown',
    'mouseup',
    'pointerup',
    'pointerdown',
    'touchstart',
    'touchend',
    'touchcancel',
    'contextmenu',

     'mousemove',
     'mouseenter',
     'mouseover',
     'mouseleave',
     'mouseout',
]

const app = document.getElementById('app');
const app2 = document.getElementById('app2');

events.forEach((t) => {
    app.addEventListener(t, e => {
        console.log('red', t, e)
    })
    app2.addEventListener(t, e => {
        console.log('blue', t, e)
    })
})




// test coding

window['test'] = {
    click: (x, y) => {
        click(x, y);
    }
}
