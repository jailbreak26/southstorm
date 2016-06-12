#!/usr/bin/env node
var http = require('http')
var request = require('request')
var fs = require('fs');
var index = fs.readFileSync('index.html');

var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
  console.log(req.url);
  res.setTimeout(25000)
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.url == "/"){
  	res.writeHead(200);
  	res.write(index);
  	res.end();
  }else{
  try {
    request(req.url.slice(1), {encoding: null}, function(error, response, body) {
      res.write(body)
      res.end()
    })
  }
  catch(e) {}}
}).listen(port)

var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
