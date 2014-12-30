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


var countArray = new Array(0, 0, 0, 0);

io.sockets.on("connection", function (socket) {
	console.log("socket connection event");

    socket.on("count", function (data) {
    	if(data.area != null) {
    		var area = data.area;
    		countArray[area]++;
	    	console.log("count(): countArray[" + area + "]=" + countArray[area] );
	    	io.sockets.emit("publish", {"area": area, "count": countArray[area]});
    	}
    });

    socket.on("clearCount", function (data) {
    	if(data.area != null) {
    		var area = data.area;
    		countArray[area] = 0;
	    	console.log("clearCount(): countArray[" + area + "]=" + countArray[area] );
	    	io.sockets.emit("publish", {"area": area, "count": countArray[area]});
    	}
    });

});
