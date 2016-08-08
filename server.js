#!/usr/bin/env node
    var http = require('http'),
	request = require('request'),
	fs = require('fs'),
	domain = require('domain'),
	index = require('zlib').gzipSync(fs.readFileSync('index.html'))
	favicon = require('zlib').gzipSync(fs.readFileSync('favicon.ico'))
	crossdomainXML = require('zlib').gzipSync(fs.readFileSync('crossdomain.xml'))
	
	
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

	
	handler = function handler(req, res) {
		switch (req.url) {
			case "/":

			case "/favicon.ico":
				res.setHeader('content-encoding', 'gzip')
				res.setHeader('content-type', 'image/x-icon')
				res.writeHead(200);
				res.write(favicon);
				res.end();
				break;

			case "/crossdomain.xml":
				res.setHeader('content-encoding', 'gzip')
				res.setHeader('content-type', 'application/xml')
				res.writeHead(200);
				res.write(crossdomainXML);
				res.end();
				break;
			default:
			
			
				try {
					res.setTimeout(25000);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Access-Control-Allow-Credentials', false);
					res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
					res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString()); // one day in the future
					var r = request(req.url.slice(1), requestOptions);
					r.pipefilter = function(response, dest) {
						for (var header in response.headers) {
							if (!allowedOriginalHeaders.test(header)) {
								dest.removeHeader(header);	
							}
						}
					};
					r.pipe(res);
				} catch (e) {
					res.end('Error: ' +  ((e instanceof TypeError) ? "make sure your URL is correct" : String(e)));
				}
			}
		}
	}

