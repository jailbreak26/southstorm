var http = require('http'),
	request = require('request'),
	fs = require('fs'),
	domain = require('domain'),
	favicon = require('zlib').gzipSync(fs.readFileSync('favicon.ico'))
	crossdomainXML = require('zlib').gzipSync(fs.readFileSync('crossdomain.xml'))
	requestOptions = {
		encoding: null,
		rejectUnauthorized: false,
		headers: {
			'accept-encoding': 'identity'
		}
	},
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
		}
	}
