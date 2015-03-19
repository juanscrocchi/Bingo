var dgram = require('dgram'); 
function ezUDP(options){
    this.port = options.port;
    if(options.multicastAddress)
        this.multicastAddress = options.multicastAddress;
    if(options.type)
        this.type = options.type
    else
        this.type = "udp4";
    this.init = function(callback, verboseCallback){
        if(!this.socket){
            var socket = dgram.createSocket(this.type); 
            socket.bind(options.port, function(){
                if(options.multicastAddress){
                    socket.addMembership(options.multicastAddress);
                }
                if(options.broadcast)
                    socket.setBroadcast(options.broadcast);
                else
                    socket.setBroadcast(true);
                if(options.multicastLoopback)
                    socket.setMulticastLoopback(options.multicastLoopback);
                else
                    socket.setMulticastLoopback(false);
                if(options.TTL)
                    socket.setTTL(options.TTL);
                if(options.multiCastTTL)
                    socket.setMulticastTTL(options.multicastTTL);
            });
            socket.on('listening', function () {
                var address = socket.address();
                if(verboseCallback)
                    verboseCallback('Listening for UDP on ' + address.address + ":" + address.port);
            });
            socket.on('message', function (message, remote) {
                callback(message,remote);
            });    
            this.socket = socket;
        }else 
            if(verboseCallback)
                verboseCallback("Warning: Socket already active");
    }
    this.end = function(verboseCallback){
        if(this.socket)
            this.socket.close();
    }
    this.send = function(outgoingMsg, host, verboseCallback){
        if(host){
            if(this.socket){
                var hostAndPort = host.split(':');
                if(hostAndPort[1]){
                    var port = hostAndPort[1];
                    host = hostAndPort[0];
                }
                else
                    port = this.port;
                var message = new Buffer(outgoingMsg);
                this.socket.send(message, 0, message.length, port, host);
                callbackMessage = "Sent: "+message+" to "+host+":"+port;

            }else
                callbackMessage = "Error: Socket inactive.";
        }else
            callbackMessage = "Error: No host. Did you mean to multicast?"
        if(verboseCallback)
            verboseCallback(callbackMessage);
    }
    this.multicast = function(outgoingMsg, verboseCallback){
        if(this.multicastAddress){
            if(this.socket){
                var message = new Buffer(outgoingMsg);
                this.socket.send(message, 0, message.length, this.port, this.multicastAddress);
                callbackMessage = "Multicasted: "+message+" to "+this.multicastAddress+":"+this.port;
            }else
                callbackMessage = "Error: socket inactive.";
        }else
            callbackMessage = "Error: No multicastAddress found. Did you mean to send?"
        if(verboseCallback)
            verboseCallback(callbackMessage);
    }
    this.broadcast = function(outgoingMsg, verboseCallback){
        if(this.socket){
            var message = new Buffer(outgoingMsg);
            this.socket.send(message, 0, message.length, this.port, '255.255.255.255');
            callbackMessage = "Broadcasted: "+message+" to "+this.port;
        }else
            callbackMessage = "Error: socket inactive.";
        if(verboseCallback)
            verboseCallback(callbackMessage);
    }
}
module.exports = ezUDP;