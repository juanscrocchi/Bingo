var host = '127.0.0.1';
var port = 5554;
var multicastAddress = '239.1.2.3';
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');


socket.on('listening', function () {
  	var address = socket.address();
  	console.log('UDP socket listening on ' + address.address + ":" + address.port);
});

socket.on('message', function (message, remote) {
  	console.log('Received '+message+' from '+remote.address+':'+remote.port);
});

socket.bind( port, function() {
    socket.setBroadcast(true);
});