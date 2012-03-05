var restify = require('restify')
    restver = require('..'); // restify-version

var api = module.exports = restify.createServer();

function respond(req, res) {
    res.send(null);
}

api.ver('1.0.0', function() {
    api.get('/access', respond);
    api.get('/multi', respond);
    api.get({
        path: '/overload'
      , version: ['3.0.0']
    }, respond);
});

api.ver(['2.0.0', '3.0.0'], function() {
    api.get('/multi', respond);
    api.ver('1.0.0', function() {
        api.get('/nested', respond);
    });
    api.get({
        path: '/stack'
      , version: '1.0.0'
    }, respond);
    api.get({
        path: '/unversioned'
    }, respond)
});
