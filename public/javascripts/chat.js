  var socket = io();
  socket.on('connect', function () {
    console.log("connected");
  });
  
  socket.on("newMessage", function(data){
	var li = $("<li>"+data.name +": "+data.body+"</li>");
	$('#messages').prepend(li);
  });
	$('#message-form').on('submit', function(e){
		e.preventDefault();
		socket.emit('createMessage',{
			name:$('input[name=name]').val(),
			body:$('textarea[name=body]').val()
		}, function(){
			$('input[name=name]').val('')
			$('textarea[name=body]').val('')
		})
	});
	
	var locationBtn = $('#send-location');
	
	locationBtn.on('click', function(){
		if(!navigator.geolocation) return alert("Your browser doesn't support geolocation");
		navigator.geolocation.getCurrentPosition( function(position){
			var pos = position.coords
			socket.emit('createLocation', {
				latitude:pos.latitude,
				longitude:pos.longitude
			}, function(){
				console.log("location")
			})
		}, function (err){
			alert("Unable to fetch location");
		})
	});
	
  socket.on("printLocation", function(data){
	$("#userLocation").html("<a href='https://www.google.com/maps?q="+data.latitude+','+ data.longitude+"' target='_blank'> Show Location</a>");
  });
	
