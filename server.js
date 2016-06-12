#!/usr/bin/env node
var parse = require('url').parse;

var data = '<?xml version="1.0"?>' +
  '<!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">' +
  '<cross-domain-policy>' +
  '<site-control permitted-cross-domain-policies="none"/>' +
  '</cross-domain-policy>';

module.exports = function crossdomain(options) {

  options = options || {};
  var caseSensitive = options.caseSensitive;

  return function crossdomain(req, res, next) {

    var pathname = parse(req.url).pathname;

    var uri;
    if (caseSensitive) {
      uri = pathname;
    } else {
      uri = pathname.toLowerCase();
    }

    if ('/crossdomain.xml' === uri) {
      res.writeHead(200, {
        'Content-Type': 'application/xml'
      });
      res.end(data);
    } else {
      next();
    }

  };

};

var port = process.env.PORT || 1337;

var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
