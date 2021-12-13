
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
]

const app = document.getElementById('app');

events.forEach((t) => {
    app.addEventListener(t, e => {
        console.log(t, e)
    })
})
