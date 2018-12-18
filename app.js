const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
server = app.listen(port, function () {
  console.log("its running now on " + port + "");
});
const socket = require('socket.io');
var sio = socket(server);
var moment = require('moment');

app.use(express.static('public'));

sio.on("connection", function (socket) {
  console.log("User Connected ID : " + socket.id);

//  socket.username = "Anonymous";

  socket.on("chengename", function (data) {
    socket.username = data.username;
  });

  socket.on('new_msg', function (data) {
    sio.sockets.emit('new_msg',{
      msg:data.msg,
      time:moment().calendar(data.time),
      user:socket.username
    });
  });

  socket.on('ishere',function (data) {
    socket.broadcast.emit('ishere', {
      ppl:data.username
    });
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit("typing",{
      username:socket.username
    });
  });
});
