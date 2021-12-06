class Slider {

    constructor(id, x, y, name, min, max, value) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
    }
}

let colors = ['red', 'orange', 'blue', 'green', 'cyan', 'salmon'];

let sliders = [];

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

function drawSlider(x, y, r, percentage, color) {
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 15;

    ctx.strokeStyle = color;
    ctx.beginPath();
    // first part of slider (1/4)
    if (percentage < 0.25) {
        ctx.arc(x, y, r, 1.5 * Math.PI, +(percentage / 0.25 * (0.5) * Math.PI) + (1.5 * Math.PI));
    } else {
        ctx.arc(x, y, r, 1.5 * Math.PI, (2 * Math.PI));
    }
    ctx.stroke();
    // second part of slider (3/4)
    if (percentage > 0.25) {
        percentage = percentage - 0.25;

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, (percentage / 0.75) * (1.5 * Math.PI));
        ctx.stroke();
    }
}

// Vsakic ko premaknem misko se tole aktivira
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    let amount = mousePos.y / 500;
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + " | " + amount;
    writeMessage(canvas, message);

    sliders.forEach(slider => {
        drawSlider(
            slider.x,
            slider.y,
            (slider.id + 1) * 40,
            (slider.value / slider.max),
            colors[slider.id]);
    })


}, false);

document.getElementById("btn_add").addEventListener("click", function() {

    let minValue = document.getElementById("min_value").value;
    let maxValue = document.getElementById("max_value").value;
    let value = document.getElementById("value").value;

    sliders.push(
        new Slider(sliders.length, 250, 250, 'name', minValue, maxValue, value));
  });