var io = require('socket.io').listen(3000);

// open the socket connection
io.sockets.on('connection', function (socket) {
	
	var id = setInterval(function() {
		socket.broadcast.emit('chat', JSON.stringify(new Date()));
	}, 1000)
	console.log("websocket connection open")
	
   socket.on('chat', function (data) {
      var sender = 'server';  
      //console.log("test!!!!!!!" + data.msgr);
      socket.broadcast.emit('chat', {
         msg : data, 
         msgr : sender
      });
   });
   
   socket.on('register', function (name) {
      socket.set('nickname', "server", function () {
         io.sockets.emit('chat', {
            msg : "connection success.", 
            msgr : "server"
         });
      });
   });
   
   socket.on('close', function () {
		console.log("websocket connection close")
		clearInterval(id)
   });

});