// Canvas & context
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.scale(0.5, 0.5);

let layer;

function start() {
    layer = new MainLayer();
    //loop();
    setInterval(loop, 50);
}

function loop(){
    layer.update();
    layer.draw();
    //requestAnimationFrame(() => loop());
}


start();