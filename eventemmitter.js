
var http = require('http');
var events = require('events')
var fs = require('fs');

var server = http.createServer(function (request, response) {
    response.writeHead(200, { "content-type": "text/plain" });

    var eventEmitter = new events.EventEmitter();
    var readableStream = fs.createReadStream('./file.txt');
    var data = '';

    eventEmitter.on('scream', function () {

        readableStream.on('data', function (chunk) {
            data += chunk;
        });

        readableStream.on('end', function () {
            console.log(data);
        });
    });

    eventEmitter.emit('scream');

});

server.listen(3000);