  var socket = io();
 
  function scrollToBottom(){
	var messageContainer = $('#messages');
	var clientHeight = messageContainer.prop('clientHeight');
	var scrollTop = messageContainer.prop('scrollTop');
	var scrollHeight = messageContainer.prop('scrollHeight');
	var newMessage = messageContainer.children('div.each-msg:last-child').innerHeight();
	if(scrollHeight > clientHeight){
		var scrollBottomGap = (scrollHeight-clientHeight);
		messageContainer.scrollTop(scrollBottomGap)
	}
  }
  
	function getRandomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}
  
  socket.on('connect', function () {
    var qs = $.deparam(window.location.search);
	socket.emit('join', qs, function(err){
		if(err){
			alert(err);
			window.location.href="/";
		}else{
		
		}
	})
  });
  
  socket.on("newMessage", function(data){
	var formattedTime = moment(data.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		name:data.name,
		createdAt:formattedTime,
		body:data.body,
		bg:getRandomColor()
	});
	$('#messages').append(html);
	scrollToBottom();
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
  var formattedTime = moment(data.createdAt).format('h:mm a');
	var location = "<a href='https://www.google.com/maps?q="+data.latitude+','+ data.longitude+"' target='_blank'> My current location</a>"
	var formattedTime = moment(data.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		name:data.user,
		createdAt:formattedTime,
		body:location,
		bg:getRandomColor()
	})
	$('#messages').append(html);
	scrollToBottom();
  });
  
  socket.on('updateUsersList', function(users){
	var ol = $("<ol class='usersList'></ol>");
	users.forEach(function (user) {
		ol.append("<li>"+user+"</li>");
	});
	$('.onlineUsersList').html(ol);
  });
	
