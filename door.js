var net = require('net');

exports.open = function(callback) {
    var socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('timeout', function() {
        callback('timeout');
    });
    socket.on('error', function() {
        callback('error');
    });
    socket.connect(23, '192.168.83.30', function() {
        socket.write('1', function() {
            socket.end();
            callback()
        });
    });
};
