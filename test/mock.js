
const events = [
    'click',
    'mousedown',
    'mouseup',
    'pointerup',
    'pointerdown',
]

const app = document.getElementById('app');

events.forEach((t) => {
    app.addEventListener(t, e => {
        console.log(t, e)
    })
})
