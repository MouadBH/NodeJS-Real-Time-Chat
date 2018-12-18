$(document).ready(function(){
  var socket = io.connect('http://localhost:5000');

  $("#app").hide();
  $("#app2").hide();
  var user = $("#username");
  var msg = $("#msg");
  var room = $("#room");

    $("#msg").keypress(function(e){
      if (e.which == 13) {
        if (msg.val() != "") {
          socket.emit("new_msg", {msg:escapeHtml(msg.val()),tima:new Date()});
          room.animate({ scrollTop: room.prop("scrollHeight")}, 1000);
          $("#statu").html("");
        } else {

        }
      }
    });

    $("#send").click(function () {
        console.log(user.val());
        socket.emit('chengename',{username:escapeHtml(user.val())});
        socket.emit('ishere',{username:escapeHtml(user.val())});
        $("#ppl").append('<li class="active"><div class="d-flex bd-highlight"><div class="img_cont"><img src="http://www.hts.jo/hts/assets/images/avatars/avatar2_big.png" class="rounded-circle user_img"><span class="online_icon"></span></div><div class="user_info"><span>' + user.val() + '</span><p>You are online now</p></div></div></li>');
          $("#step").hide();
          $("#app").fadeIn("slow");
          $("#app2").fadeIn("slow");
    });

    socket.on("new_msg",function (data) {
        console.log(data);
        if (user.val() == data.user) {
          room.append('<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://dumagueteinfo.com/classifieds/general/app/uploads/2017/03/user.png" class="rounded-circle user_img_msg"></div><div class="msg_cotainer" style="verflow: hidden;">'+ escapeHtml(user.val()) + ': ' + escapeHtml(msg.val()) + '<span class="msg_time">' + data.time + '</span></div></div>');
          $("#statu").html("");
          msg.val("");
        } else {
            $.playSound("http://talkerscode.com/webtricks/demo/audio_file.mp3")
            room.append('<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send" style="verflow: hidden;">' + data.msg + ' :' + data.user +'<span class="msg_time_send">' + data.time + '</span></div><div class="img_cont_msg"><img src="http://www.hts.jo/hts/assets/images/avatars/avatar2_big.png" class="rounded-circle user_img_msg"></div></div>');
            $("#statu").html("");
        }
        room.animate({ scrollTop: room.prop("scrollHeight")}, 1000);
    });

    socket.on('ishere', function (data) {
        $("#ppl").append('<li id="' + data.ppl + '"><div class="d-flex bd-highlight"><div class="img_cont"><img src="http://www.hts.jo/hts/assets/images/avatars/avatar2_big.png" class="rounded-circle user_img"><span class="online_icon"></span></div><div class="user_info"><span>' + data.ppl + '</span><p>is online</p></div></div></li>');
    });

    socket.on('gonne', function (data) {
      $('#'+data.username).empty();
    });

    $( "#msg" ).keypress(function(e) {
      if (e.which != 13) {
        socket.emit('typing');
        socket.on('typing', function (data) {
          $("#statu").html(data.username + " is typing a message0");
        });
      }
    });

    var timer = null;
    $("#msg").keydown(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        socket.emit('styping');
        socket.on('styping', function (data) {
          $("#statu").html("");
        });
      },700);
    });

    function escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };

      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

});
