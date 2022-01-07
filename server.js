// import express
let express = require('express');
// create express app
let app = express();
let server = app.listen(3000); // start server listening on port 3000

app.use(express.static('public')); // specify root directory

console.log("My socket server is running");

let { Server: socket } = require('socket.io');

let io = new socket(server);

io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);

    socket.on('mouse', (data) => {
        socket.broadcast.emit('mouse', data);
    });

});
