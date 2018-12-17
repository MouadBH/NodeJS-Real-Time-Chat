const express = require('express');
const app = express();
const port = 3030;
server = app.listen(port, function () {
  console.log("its running now on " + port + "");
});
const socket = require('socket.io');
var sio = socket(server);
var moment = require('moment');

app.use(express.static('public'));

sio.on("connection", function (socket) {
  console.log("User Connected ID : " + socket.id);

  socket.username = "Anonymous";

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

  socket.on('typing', function (data) {
    socket.broadcast.emit("typing",{
      username:socket.username
    });
  });
});
