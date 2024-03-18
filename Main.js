// Canvas & context
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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