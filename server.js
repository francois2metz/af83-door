var express = require('express')
  , door = require('./door')
;

var app = express.createServer();

app.put('/door', function(req, res) {
    door.open(function(err) {
        if (err) res.send('door error', 500);
        else res.send('door opened');
    });
});

app.listen(3000);
