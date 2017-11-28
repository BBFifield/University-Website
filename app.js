var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public/WebContent'));
app.use(express.static(__dirname + '/public/WebContent/courseStyles'));

app.get(function(req, res) {
	
  res.sendfile(path.join(__dirname + 'index.html')); 
});

app.listen(8080);