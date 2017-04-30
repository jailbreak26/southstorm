#!/usr/bin/env node
var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 1337;

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
}).listen(80); // Listen on port 8080.
