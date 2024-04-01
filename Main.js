let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasWidth = canvas.width*100;
canvasHeight = canvas.height*100;
ctx.scale(0.01, 0.01);

let layer;

function start() {
    layer = new MainLayer();
    loop();
}

function loop(){
    layer.update();
    layer.draw();
    requestAnimationFrame(() => loop());
}


start();