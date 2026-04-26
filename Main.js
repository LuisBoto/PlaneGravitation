let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasWidth = canvas.width*100;
canvasHeight = canvas.height*100;
ctx.scale(0.01, 0.01);

let layer;
let fpsCap = 1000/60;
let lastFrame;

function start() {
    layer = new MainLayer();
    lastFrame = Date.now();
    requestAnimationFrame(loop);
}

function loop() {
    requestAnimationFrame(loop);
    if (getDeltaTime() > fpsCap) {
        layer.update();
        layer.draw();
        lastFrame = Date.now();
    }
}

function getDeltaTime() {
    return Date.now() - lastFrame;
}


start();