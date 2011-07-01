var express = require('express')
  , door = require('./door')
  , fs = require('fs')
;

var config = JSON.parse(fs.readFileSync(__dirname +'/config.json'));

var app = express.createServer();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/door', function(req, res) {
    door.open(config.door, function(err) {
        if (err) res.send('door error', 500);
        else res.send('door opened');
    });
});

app.listen(config.api.port, function() {
    console.log("now listening on http://127.0.0.1:%d/", config.api.port);
});
