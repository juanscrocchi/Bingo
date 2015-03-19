var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.bind( 5554, function() {
    socket.setBroadcast(true);
});

var message = new Buffer("This is a message :p");
socket.send(message, 0, message.length, 5554, '255.255.255.255');
console.log("Sent "+message);