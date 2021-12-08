class Slider {

    constructor(id, x, y, name, min, max, amount) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.min = min;
        this.max = max;
        this.amount = amount;
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

    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.arc(x, y, r + 7, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.arc(x, y, r - 7, 0, 2 * Math.PI);
    ctx.stroke();


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

function drawThemAll() {
    sliders.forEach(slider => {
        drawSlider(
            slider.x,
            slider.y,
            (slider.id + 1) * 40,
            (slider.amount / slider.max),
            colors[slider.id]);
    })
}

// Vsakic ko premaknem misko se tole aktivira
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    let amount = mousePos.y / 500;
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + " | " + amount;
    writeMessage(canvas, message);

    drawThemAll();


}, false);

function abs(x) {
    return x < 0 ? -x : x;
}

// Vsakic ko premaknem misko se tole aktivira
canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    let x = mousePos.x;
    let y = mousePos.y;


    let xx = abs(mousePos.x - 250);
    let yy = abs(mousePos.y - 250);



    let r = Math.sqrt(xx * xx + yy * yy);


    // r je pravilno izračunan

    for (let i = 1; i < sliders.length + 1; i++) {
        if (abs((i * 40) - r) < 6) {
            console.log("-----------------------------------------------");
            console.log("xx: " + xx);
            console.log("yy: " + yy);
            console.log(r);
            console.log("zadel si " + i + " trail");

            console.log(sliders[0])

            let kvadrant = 0;
            let kot = 0;

            if (x > 250 && y < 250) {
                kvadrant = 1;
            } else if (x < 250 && y < 250) {
                kvadrant = 2;
            } else if (x < 250 && y > 250) {
                kvadrant = 3;
            } else if (x > 250 && y > 250) {
                kvadrant = 4;
            } else {
                console.log("i cannot find this quadrant");
            }

            kot = Math.asin(yy / r);

            kot = kot * 180 / Math.PI;
            switch (kvadrant) {
                case 0:
                    break;
                case 1:
                    console.log("si v 1 kvadrantu ");
                    console.log("kot je : " + (90 - kot));
                    sliders[i - 1].amount = (0.25 * ((90 - kot) / 90) * sliders[i - 1].max);
                    break;

                case 2:
                    console.log("si v 2 kvadrantu ");
                    console.log("kot je : " + kot);

                    sliders[i - 1].amount = (0.75 * sliders[i - 1].max) + (0.25 * (kot / 90) * sliders[i - 1].max);


                    break;

                case 3:
                    console.log("si v 3 kvadrantu");
                    console.log("kot je : " + kot);

                    sliders[i - 1].amount = (0.5 * sliders[i - 1].max) + (0.25 * ((90 - kot) / 90) * sliders[i - 1].max);
                    break;

                case 4:
                    console.log("si v 4 kvadrantu");
                    console.log("kot je : " + kot);

                    sliders[i - 1].amount = (0.25 * sliders[i - 1].max) + (0.25 * (kot / 90) * sliders[i - 1].max);
                    break;

            }

        }
    }

    drawThemAll();


}, false);

document.getElementById("btn_add").addEventListener("click", function () {

    let minValue = document.getElementById("min_value").value;
    let maxValue = document.getElementById("max_value").value;
    let amount = document.getElementById("value").value;

    sliders.push(
        new Slider(sliders.length, 250, 250, 'name', minValue, maxValue, amount));

    drawThemAll();
});