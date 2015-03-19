var ezUDP = require('./ezUDP.js');

var socket = new ezUDP({
    port: 5555
});

socket.init();

socket.broadcast("hola");