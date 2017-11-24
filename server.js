var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8080
var server = app.listen(port)
var io = require('socket.io')(server);

app.use(express.static('public'));

app.set('view engine', 'ejs');



io.on('connection', function(socket){
  socket.on('testMessage', function(msg){
    socket.broadcast.volatile.emit("testMessage", msg);
  });
});


app.get('/', function (req, res) {
	res.render('main.ejs', {})
})
app.get('/ui', function (req, res) {
	res.render('ui.ejs', {})
})

app.get('/uiphone', function (req, res) {
	res.render('uiphone.ejs', {})
})

app.get('/movie', function (req, res) {
	res.render('movie.ejs', {})
})

app.get('/collisions', function (req, res) {
	res.render('collisions.ejs', {})
})
app.get('/collisionsphone', function (req, res) {
	res.render('collisionsphone.ejs', {})
})

app.get('/moviephone', function (req, res) {
	res.render('moviephone.ejs', {})
})
