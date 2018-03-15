var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const http = require('http');
 const app = express();	
 const server = http.createServer(app)

var index = require('./routes/index');

var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

var gM = require('./utils/message');
var validators = require('./utils/validators');

var Users = require('./utils/users').Users;

var users = new Users();


io.on('connection', function (socket) {
	
	socket.on('createMessage', function(message, callback){
		io.emit('newMessage', gM.generateMessage(message.name, message.body));
		callback('Ob created')
	});
	
	socket.on('createLocation', function(location, callback){
		io.emit('printLocation', gM.shareLocation("User ", location));
		callback('Ob created')
	});  

  socket.on('join', function (params, callback){
	if(!validators.isString(params.name) && !validators.isString(params.room)){
		return callback("Name and room is manditory");
	}
	socket.join(params.room);
	users.removeUser(socket.id);
	users.addUser(socket.id, params.name, params.room);
	io.to(params.room).emit('updateUsersList', 	users.getUsersList(params.room));
	socket.emit('newMessage', gM.generateMessage('Admin ', 'Welcome to chat app'));
	socket.broadcast.to(params.room).emit('newMessage', gM.generateMessage('Naresh', 'New user joined'));
  });
  
  socket.on('disconnect', () =>{
	var user = users.removeUser(socket.id);
	if(user){
		io.to(user.room).emit('updateUsersList', 	users.getUsersList(user.room));
		io.to(user.room).emit('newMessage', gM.generateMessage("Admin", user.name +' has left from the chat room'));
	}
  });  
  
	
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, () =>{
	console.log('app running at'+ port);
});

module.exports = app;
