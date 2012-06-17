/*!
* Restify - Version
* Copyright(c) 2012 Mal Graty <mal.graty@googlemail.com>
* MIT Licensed
*
* Based upon:
* Express - Contrib - namespace
* Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
* MIT Licensed
* Repo: https://github.com/visionmedia/express-namespace
*/

/**
* Module dependencies.
*/

var restify = require('restify')
  , join = require('path').join
  , Server = restify.createServer().constructor;


/**
* Coerce `value` to an array, but only if not one already
*
* @param {Object} value
* @return {Array}
*/

function arrayify(value)
{
    if ( Array.isArray(value) )
        return value;
    return [value];
}

/**
* Version using the given `version`, providing a callback `fn()`,
* which will be invoked immediately, resetting the version to the previous.
*
* @param {String} version
* @param {Function} fn
* @return {Server} for chaining
* @api public
*/

exports.ver = function(version, fn) {
    var prev = this._ver;
    this._ver = arrayify(version);
    fn.call(this);
    this._ver = prev;
    return this;
};


/**
* Return the current version space.
*
* @return {String}
* @api public
*/

exports.__defineGetter__('currentVersion', function() {
    return this._ver;
});

/**
* Proxy HTTP methods to provide namespacing support.
* Methods taken from:
* https://github.com/mcavage/node-restify/blob/a3d8dad77e18d342b9e629f221fc113683902170/lib/server.js#L314
*/

['del', 'get', 'head', 'post', 'put', 'patch'].forEach(function(method) {
    var orig = Server.prototype[method];
    exports[method] = function() {
        var args = Array.prototype.slice.call(arguments)
          , curr = this.currentVersion
          , opts = args.shift();
        if ( opts instanceof Object )
            if ( opts.version )
                opts.version = arrayify(opts.version).concat(curr);
            else
                opts.version = curr;
        else
            opts = { path: opts, version: curr };
        return orig.call(this, opts, args);
    };
    return this;
});

// merge

for (var key in exports) {
    var desc = Object.getOwnPropertyDescriptor(exports, key);
    Object.defineProperty(Server.prototype, key, desc);
}
