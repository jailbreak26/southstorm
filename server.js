#!/usr/bin/env node
var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 1337;
 
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins 
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


var http = require('http'),
	request = require('request'),
	fs = require('fs'),
	domain = require('domain'),
	crossdomainXML = require('zlib').gzipSync(fs.readFileSync('crossdomain.xml'))
	requestOptions = {
		encoding: null,
		rejectUnauthorized: false,
		headers: {
			'accept-encoding': 'identity'
		}
	},
	server = http.createServer(function (req, res) {
		var d = domain.create();
		d.on('error', function (e){
			console.log('ERROR', e.stack);

			res.statusCode = 500;
			res.end('Error: ' + ((e instanceof TypeError) ? "make sure your URL is correct" : String(e)));
		});

		d.add(req);
		d.add(res);

		d.run(function() {
			handler(req, res);
		});
	}).listen(port),
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
			default:
				 catch (e) {
					res.end('Error: ' +  ((e instanceof TypeError) ? "make sure your URL is correct" : String(e)));
				}
			}
		}
	}
