class Slider {

    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

// To je okno v katerega risem
var canvas = document.getElementById('myCanvas');

// Izpisuje pozicijo miske na canvas
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

// Vrne pozicijo miske
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Vsakic ko premaknem misko se tole aktivira
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    writeMessage(canvas, message);

    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 15;

    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    // 3/2 == ura 12
    // 1.499 == minuta do 12
    // 0PI == ura 3
    // 1/2PI == ura 6
    // PI == ura 9
    ctx.arc(250, 250, 40, (3 / 2 * Math.PI), (1.499 * Math.PI));
    ctx.stroke();


}, false);