var express = require('express')
  , door = require('./door')
  , fs = require('fs')
  , Log = require('log')
;

var config = JSON.parse(fs.readFileSync(__dirname +'/config.json'));

// create logger
var log = new Log(Log.INFO, fs.createWriteStream(config.auth_log));

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
        var username = new Buffer(authorization.split(" ")[1], "base64").toString("utf8").split(":")[0];
        log.info("trying to log with username: "+ username);
        require('./http_auth_backend')(config, authorization, function(err, result) {
            if (err || !result) {
                log.error("access denied for username: "+ username);
                return needAuthentication();
            } else {
                log.info("access granted for username: "+ username);
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
