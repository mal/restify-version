// division-by-zero-test.js

var vows = require('vows')
  , assert = require('assert')
  , http = require('http')
  , request = require('request');

var port = 8065
  , server = require('./server.js');

var api = {
    get: function(url, version) {
        var opts = 'http://localhost:' + port + url;
        if ( version )
            opts = {
                url: opts,
                headers: {
                    'Accept-Version': version
                }
            }
        request(opts, this.callback);
    }
};

function check(status) {
    return function(err, res) {
        assert.equal(res.statusCode, status);
    }
}

function expect(status)
{
    var context = {
        topic: function() {
            var args = this.context.name.split(/ +v?/)
              , method = args.shift().toLowerCase();
            api[method].apply(this, args);
        }
    };

    var vow = 'should respond with a ' + status + ' ' + http.STATUS_CODES[status];
    context[vow] = check(status);

    return context;
}

// Create a Test Suite
vows.describe('Restify Version').addBatch({
    'Test Server': {
        topic: function() {
            server.listen(port, this.callback);
        }
      , 'started': function() {
            return true;
        }
    }
}).addBatch({
    'GET /access': expect(200)
  , 'GET /access v1.0.0': expect(200)
  , 'GET /access v2.0.0': expect(400)
  , 'GET /access v3.0.0': expect(400)
  , 'GET /multi': expect(200)
  , 'GET /multi v1.0.0': expect(200)
  , 'GET /multi v2.0.0': expect(200)
  , 'GET /multi v3.0.0': expect(200)
  , 'GET /nested': expect(200)
  , 'GET /nested v1.0.0': expect(200)
  , 'GET /nested v2.0.0': expect(400)
  , 'GET /nested v3.0.0': expect(400)
  , 'GET /overload': expect(200)
  , 'GET /overload v1.0.0': expect(200)
  , 'GET /overload v2.0.0': expect(400)
  , 'GET /overload v3.0.0': expect(200)
  , 'GET /stack': expect(200)
  , 'GET /stack v1.0.0': expect(200)
  , 'GET /stack v2.0.0': expect(200)
  , 'GET /stack v3.0.0': expect(200)
  , 'GET /unversioned': expect(200)
  , 'GET /unversioned v1.0.0': expect(400)
  , 'GET /unversioned v2.0.0': expect(200)
  , 'GET /unversioned v3.0.0': expect(200)
}).addBatch({
    'Test Server': {
        topic: function() {
            server.on('close', this.callback);
            server.close();
        }
      , 'stopped': function() {
            return true;
        }
    }
}).export(module);
