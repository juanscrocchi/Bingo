//var dgram = require('dgram'); 
var ezUDP = require('./ezUDP.js');

var conectar = new ezUDP({
    port: 5554
});

conectar.init(function(message,remote){
    console.log(remote.address+":"+remote.port+" dice "+message);
});
