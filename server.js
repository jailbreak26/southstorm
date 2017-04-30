#!/usr/bin/env node
var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

var fs = require('fs');
require('http').createServer(function(req, res) {
  if (req.url === '/crossdomain.xml') {
    fs.createReadStream('crossdomain.xml').pipe(res);
    return;
  }
  // Let the server handle it
  cors_proxy.emit('request', req, res);
}).listen(8080); // Listen on port 8080.
