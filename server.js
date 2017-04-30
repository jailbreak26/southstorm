#!/usr/bin/env node
var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 1337;

var cors_proxy = require('cors-anywhere');
var http = require('http'),
	request = require('request'),
	fs = require('fs'),
	domain = require('domain'),
	crossdomainXML = require('zlib').gzipSync(fs.readFileSync('crossdomain.xml'))
	requestOptions = {
		encoding: null
	},
	handler = function handler(req, res) {
		switch (req.url) {
			case "/":
			case "/crossdomain.xml":
				res.setHeader('content-encoding', 'gzip')
				res.setHeader('content-type', 'application/xml')
				res.writeHead(200);
				res.write(crossdomainXML);
				res.end();
				break;		
			
		}
	},
cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


