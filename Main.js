// Canvas & context
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasWidth = canvas.width*4;
canvasHeight = canvas.height*4;
ctx.scale(0.25, 0.25);

let layer;

function start() {
    layer = new MainLayer();
    loop();
    //setInterval(loop, 50);
}

function loop(){
    layer.update();
    layer.draw();
    requestAnimationFrame(() => loop());
}


start();