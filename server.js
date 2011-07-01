var express = require('express')
  , door = require('./door')
  , fs = require('fs')
;

var config = JSON.parse(fs.readFileSync(__dirname +'/config.json'));

var app = express.createServer();

app.set('view engine', 'ejs');
/**
 * Http authentification
 * We have to provide an url in the config file *auth_http_backend*.
 * We are forwarding Authorization Header from user to *auth_http_backend*.
 */
app.use(function(req, res, next) {
    function needAuthentication() {
        res.send('Authentication required', {'WWW-Authenticate': 'Basic realm="Door Auth"'}, 401);
    }
    var authorization = req.header('Authorization');
    if (!authorization) {
        return needAuthentication();
    } else {
        require('./http_auth_backend')(config, authorization, function(err, result) {
            if (err || !result) {
                return needAuthentication();
            } else {
                next();
            }
        });
    }
});

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
