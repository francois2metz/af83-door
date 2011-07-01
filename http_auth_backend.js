var request = require('request');

module.exports = function(config, authorization, callback) {
    request({uri:config.auth_http_backend,
             headers: {'Authorization': authorization}}, function (err, response, body) {
        callback(err, response.statusCode == 200);
    });
};
