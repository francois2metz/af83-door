var net = require('net');

exports.open = function(config, callback) {
    var socket = new net.Socket();
    socket.setTimeout(config.timeout);
    socket.on('timeout', function() {
        callback('timeout');
    });
    socket.on('error', function() {
        callback('error');
    });
    socket.connect(config.port, config.host, function() {
        socket.write('1', function() {
            socket.end();
            callback()
        });
    });
};
