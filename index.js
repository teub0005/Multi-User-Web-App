var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/aboutus.html', function(req, res){
	console.log("about us");
	app.use(express.static(__dirname + '/public/images'));
	res.sendFile(__dirname + '/public/aboutus.html');
});
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(8021, function(){
	console.log('listening on *:8021');
});
