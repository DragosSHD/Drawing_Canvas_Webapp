let socket;

function setup() {
    createCanvas(1500, 750);
    background(51);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);

}

function newDrawing(data) {
    noStroke();
    fill(150);
    ellipse(data.x, data.y, 60, 60);
}

function mouseDragged() {
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 60, 60);


    let data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

}