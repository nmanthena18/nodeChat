  var socket = io();
  socket.on('connect', function () {
    console.log("connected");
  });
  
  socket.on("newMessage", function(data){
	var li = $("<li>"+data.name +": "+data.body+"</li>");
	$('#messages').prepend(li);
  });
$(function(){
	$('#message-form').on('submit', function(e){
		e.preventDefault();
		socket.emit('createMessage',{
			name:$('input[name=name]').val(),
			body:$('textarea[name=body]').val()
		}, function(){
			console.log("done")
		})
	});
	
	
});