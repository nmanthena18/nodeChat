var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const http = require('http');
 const app = express();	
 const server = http.createServer(app)

var index = require('./routes/index');
var users = require('./routes/users');

var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

var gM = require('./utils/message');


io.on('connection', function (socket) {

	console.log("IO connection started");
	socket.emit('newMessage', gM.generateMessage('Admin: ', 'Welcome to chat app'));
	socket.broadcast.emit('newMessage', gM.generateMessage('Naresh', 'New user joined'));
	
	socket.on('createMessage', function(message, callback){
		io.emit('newMessage', gM.generateMessage(message.name, message.body));
		callback('Ob created')
	});
	
  
  socket.on('disconnect', () =>{
	console.log("Server disconnected");
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
