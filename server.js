var express = require('express')
  , door = require('./door')
;

var app = express.createServer();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/door', function(req, res) {
    door.open(function(err) {
        if (err) res.send('door error', 500);
        else res.send('door opened');
    });
});

app.listen(3000);
