$(document).ready(function(){
  var socket = io.connect('https://rtchat07.herokuapp.com:5000');

  $("#app").hide();
  var user = $("#username");
  var msg = $("#msg");
  var room = $("#room");

    $("#username").keypress(function(e){
      console.log(user.val());
      socket.emit('chengename',{username:user.val()});
      if (e.which == 13) {
        $("#step").hide();
        $("#app").show();
      }
    });

    $("#send").click(function () {
        socket.emit("new_msg", {msg:msg.val(),tima:new Date()});
    });

    socket.on("new_msg",function (data) {
        console.log(data);
        if (user.val() == data.user) {
          room.append('<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://dumagueteinfo.com/classifieds/general/app/uploads/2017/03/user.png" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">'+ user.val() + ': ' + msg.val() + '<span class="msg_time">' + data.time + '</span></div></div>');
          $("#statu").html("");
          msg.val() = "";
        } else {
            room.append('<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + data.msg + ' :' + data.user +'<span class="msg_time_send">' + data.time + '</span></div><div class="img_cont_msg"><img src="http://www.hts.jo/hts/assets/images/avatars/avatar2_big.png" class="rounded-circle user_img_msg"></div></div>');
            $("#statu").html("");
            msg.val() = "";
        }
    });

    $( "#msg" ).keypress(function() {
      socket.emit('typing');
      socket.on('typing', function (data) {
        $("#statu").html(data.username + " is typing a message");
      });
    });
});
