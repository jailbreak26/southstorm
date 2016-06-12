var http = require('http'),
	request = require('request'),
	fs = require('fs'),
	domain = require('domain'),
	favicon = require('zlib').gzipSync(fs.readFileSync('favicon.ico'))
	crossdomainXML = require('zlib').gzipSync(fs.readFileSync('crossdomain.xml'))
	port = process.env.PORT || 1337,
	allowedOriginalHeaders = new RegExp('^' + require('./allowedOriginalHeaders.json').join('|'), 'i')
	bannedUrls = new RegExp(require('./bannedUrls.json').join('|'), 'i'),
	requestOptions = {
		encoding: null,
		rejectUnauthorized: false,
		headers: {
			'accept-encoding': 'identity'
		}
	},
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
				if (bannedUrls.test(req.url)) {
					res.writeHead(403);
					res.end('FORBIDDEN');
				} else {
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
