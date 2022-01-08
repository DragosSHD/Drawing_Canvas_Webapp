let socket;
let fillColor = '#fff';

function changeColor(colorId) {
    switch (colorId) {
        case 'set-white':
            fillColor = '#fff';
            break;
        case 'set-red':
            fillColor = '#ff4f4f';
            break;
        case 'set-yellow':
            fillColor = '#edf283';
            break;
        case 'set-green':
            fillColor = '#99ff80';
            break;
        case 'set-blue':
            fillColor = '#6860fc';
            break;
        case 'set-pink':
            fillColor = '#ffabab';
            break;
    }
    console.log(fillColor);
}

let sketch = function(p) {
    p.setup = function() {
        p.createCanvas(1200, 750);
        p.background(51);

        socket = io.connect('http://localhost:3000');
        socket.on('mouse', newDrawing);

    }

    function newDrawing(data) {
        p.noStroke();
        p.fill(150);
        p.ellipse(data.x, data.y, 60, 60);
    }

    p.mouseDragged = function() {
        p.noStroke();
        p.fill(fillColor);
        p.ellipse(p.mouseX, p.mouseY, 60, 60);


        let data = {
            x: p.mouseX,
            y: p.mouseY
        }

        socket.emit('mouse', data);
    }
}

new p5(sketch, window.document.getElementById('drawing-board'));

