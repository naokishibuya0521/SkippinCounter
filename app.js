/**
 * Skippin Counter
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var os = require('os');
var ejs = require('ejs');


var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', routes.index);
app.get('/client', routes.client);

var server = http.createServer(app);

var io = socketio.listen(server);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


var count_0 = 0;

io.sockets.on("connection", function (socket) {
	console.log("socket connection event");

    socket.on("count", function (data) {
    	if(data.area == 0) {
    		count_0++;
    	}
    	console.log("count(): count_0=" + count_0 );
    	io.sockets.emit("publish", {'area': 0, 'count': count_0});
    });

    socket.on("clearCount", function (data) {
    	if(data.area == 0) {
    		count_0 = 0;
    	}
    	console.log("clearCount(): count_0=" + count_0 );
    	io.sockets.emit("publish", {'area': 0, 'count': count_0});
    });

});
