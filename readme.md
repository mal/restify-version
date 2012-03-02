# Restify Version
      
The _restify-version_ module provides version space capabilities to restify.

## Installation

npm:

    $ npm install restify-version

## Usage

To utilize this module simply `require('restify-version')` and `api.ver()` will automatically be available to you.

Usage is as follows, simply pass a callback function and route to the method, after each callback invocation is complete, the version is restored to it's previous state.

    api.ver('1.2.3', function(){
      api.get('/test/v123', function(req, res){
        res.send('GET /test/v123');
      });
    });

    api.ver('1.2.4', function(){
      api.get('/test/v124', function(req, res){
        res.send('GET /test/v124');
      });
    });

This would allow the following requests

    GET /test/v123 HTTP/1.1
    Accept-Version: 1.2.3

    GET /test/v124 HTTP/1.1
    Accept-Version: 1.2.4

But would issue errors for

    GET /test/v123 HTTP/1.1
    Accept-Version: 1.2.4

    GET /test/v124 HTTP/1.1
    Accept-Version: 1.2.3

You can also access the current version via `api.currentVersion`

## Inspiration

_restify-version_ was inspired by and based upon [TJ Holowaychuk](https://github.com/visionmedia)'s [_express-namespace_](https://github.com/visionmedia/express-namespace)

## License 

(The MIT License)

Copyright (c) 2012 Mal Graty &lt;mal.graty@googlemail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

