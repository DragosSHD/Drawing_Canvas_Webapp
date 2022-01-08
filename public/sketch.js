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
        let newColor = increase_brightness(data.color, 50);
        p.fill(newColor);
        p.ellipse(data.x, data.y, 60, 60);
    }

    p.mouseDragged = function() {
        p.noStroke();
        p.fill(fillColor);
        p.ellipse(p.mouseX, p.mouseY, 60, 60);


        let data = {
            x: p.mouseX,
            y: p.mouseY,
            color: fillColor
        }

        socket.emit('mouse', data);
    }
}

function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
        ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

new p5(sketch, window.document.getElementById('drawing-board'));

