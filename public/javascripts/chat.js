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
		if($('input[name=name]').val() == '') return;		
		socket.emit('createMessage',{
			name:"User",
			body:$('input[name=name]').val()
		}, function(){
			$('input[name=name]').val('')
		})
	});
	
	var locationBtn = $('#send-location');
	
	locationBtn.on('click', function(){
		if(!navigator.geolocation) return alert("Your browser doesn't support geolocation");
		locationBtn.attr('disabled', 'disabled').text('Sending location');
		navigator.geolocation.getCurrentPosition( function(position){
			locationBtn.removeAttr('disabled').text('Send location');
			var pos = position.coords
			socket.emit('createLocation', {
				latitude:pos.latitude,
				longitude:pos.longitude
			}, function(){
				console.log("location sent")
			})
		}, function (err){
			alert("Unable to fetch location");
			locationBtn.removeAttr('disabled').text('Send location');
		})
	});
	
  socket.on("printLocation", function(data){
	var li = $("<li>"+data.user+": <a href='https://www.google.com/maps?q="+data.latitude+','+ data.longitude+"' target='_blank'> My current location</a></li>")
	$('#messages').prepend(li);
  });
	
