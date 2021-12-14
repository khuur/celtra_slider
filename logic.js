class Slider {
    constructor(id, x, y, name, min, max, amount, color, step) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.min = min;
        this.max = max;
        this.amount = amount;
        this.color = color;
        this.step = step;
        this.selected = false;
    }
}

var sliders = [];

// To je okno v katerega risem
var canvas = document.getElementById('myCanvas');

function writeAngle(canvas, message) {
    var context = canvas.getContext('2d');
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 510, 55);
}

function clearCanvas(canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawSlider(slider) {
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;

    let x = slider.x;
    let y = slider.y;
    let r = (slider.id + 1) * 30;
    let percentage = slider.amount / slider.max;
    let color = slider.color;
    let amount = slider.amount;


    // outer line of slider
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.arc(x, y, r + 9, 0, 2 * Math.PI);
    ctx.stroke();

    // inner line of slider
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.arc(x, y, r - 9, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 19;

    ctx.strokeStyle = color;
    ctx.beginPath();
    // first part of slider (1/4)
    if (percentage < 0.25) {
        // draw only part of circle
        ctx.arc(x, y, r, 1.5 * Math.PI, +(percentage / 0.25 * (0.5) * Math.PI) + (1.5 * Math.PI));
    } else {
        // draw full 1/4 of circle
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

    if (percentage < 0.25) {
        
        var xxx = r * Math.cos(Math.PI * 2 * percentage);
        var yyy = r * Math.sin(Math.PI * 2 * percentage);

        console.log(xxx);
        console.log(yyy);

        xxx += 250;
        yyy += 250;

        ctx.lineWidth = 12;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(xxx, yyy, 6, 0, 2 * Math.PI);
        ctx.stroke();
    } else {

        var xxx = r * Math.cos(Math.PI * 2 * percentage);
        var yyy = r * Math.sin(Math.PI * 2 * percentage);

        console.log(xxx);
        console.log(yyy);

        xxx += 250;
        yyy += 250;

        ctx.lineWidth = 12;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(xxx, yyy, 6, 0, 2 * Math.PI);
        ctx.stroke();

    }



}

function drawThemAll() {
    sliders.forEach(slider => {
        drawSlider(slider);
    })
}

function valuesOfSliders(canvas) {

    var context = canvas.getContext('2d');
    context.font = '18pt Calibri';
    let i = 0;
    sliders.forEach(slider => {

        context.fillStyle = 'black';
        let text = "";
        text += "$"
        text += String(Math.round(Number(slider.amount))) + " ";
        text += slider.name

        context.fillText(text, 600, 100 + (i * 30));
        i++;

        context.lineWidth = 4;
        context.beginPath();
        context.strokeStyle = slider.color;
        context.rect(580, 60 + (i * 30), 3, 6);
        context.stroke();
    });
}

function getAngleFromMousePosition(canvas, evt) {
    let mousePos = getMousePos(canvas, evt);
    let x = mousePos.x;
    let y = mousePos.y;

    let xx = abs(x - 250);
    let yy = abs(y - 250);

    let r = Math.sqrt(xx * xx + yy * yy);

    let quadrant = 0;

    if (x >= 250 && y <= 250) {
        quadrant = 1;
    } else if (x <= 250 && y <= 250) {
        quadrant = 2;
    } else if (x <= 250 && y >= 250) {
        quadrant = 3;
    } else if (x >= 250 && y >= 250) {
        quadrant = 4;
    } else {
        console.log("i cannot find this quadrant");
    }

    let angle = Math.asin(yy / r) * 180 / Math.PI;

    switch (quadrant) {
        case 0:
            return 0;
        case 1:
            return 90 - angle;
        case 2:
            return 270 + angle;
        case 3:
            return 180 + (90 - angle);
        case 4:
            return 90 + angle;
    }

}

canvas.addEventListener('mousemove', function (evt) {

    clearCanvas(canvas);
    valuesOfSliders(canvas);
    drawThemAll();

    angle = getAngleFromMousePosition(canvas, evt);
    sliders.forEach(slider => {
        if (slider.selected === true) {
            slider.amount = (angle / 360) * slider.max;

            slider.amount = slider.amount - Math.round(Number(slider.amount)) % Number(slider.step)
            slider.amount = Math.round(Number(slider.amount))
        }
    })
}, false);

canvas.addEventListener('mousedown', function (evt) {

    var mousePos = getMousePos(canvas, evt);

    let xx = abs(mousePos.x - 250);
    let yy = abs(mousePos.y - 250);

    let r = Math.sqrt(xx * xx + yy * yy);

    for (let i = 0; i < sliders.length; i++) {
        if (abs(((i + 1) * 30) - r) < 6) {
            sliders[i].selected = true;
        }
    }

}, false);

canvas.addEventListener('mouseup', function (evt) {
    sliders.forEach(slider => {
        slider.selected = false;
    })

}, false);

function abs(x) {
    return x < 0 ? -x : x;
}

canvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);

    let xx = abs(mousePos.x - 250);
    let yy = abs(mousePos.y - 250);

    let r = Math.sqrt(xx * xx + yy * yy);

    for (let i = 0; i < sliders.length; i++) {
        if (abs(((i + 1) * 30) - r) < 6) {
            let angle = getAngleFromMousePosition(canvas, evt);
            sliders[i].amount = (angle / 360) * sliders[i].max;

            let slider = sliders[i];
            slider.amount = slider.amount - Math.round(Number(slider.amount)) % Number(slider.step)
            slider.amount = Math.round(Number(slider.amount))

            break;
        }
    }
    clearCanvas(canvas);
    valuesOfSliders(canvas);
    drawThemAll();

}, false);

document.getElementById("btn_add").addEventListener("click", function () {

    if (sliders.length > 9) {
        return "";
    }
    let minValue = document.getElementById("min_value").value;
    let maxValue = document.getElementById("max_value").value;
    let amount = document.getElementById("value").value;
    let name = document.getElementById("name").value;
    let color = document.getElementById("color").value;
    let step = document.getElementById("step").value;

    //color = "#" + String(Math.random() * 999999).substr(0, 6);
    color = "#FFA500";

    sliders.push(
        new Slider(sliders.length, 250, 250, name, minValue, maxValue, amount, color, step));

    clearCanvas(canvas);
    drawThemAll();
    valuesOfSliders(canvas);
});