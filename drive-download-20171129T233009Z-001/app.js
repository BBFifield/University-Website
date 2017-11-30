
var express = require("express");
var path = require("path");
var routes = require('./routes')
var http = require('http')

var app = express();

app.use(express.static(__dirname));

//all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);

app.use(express.static(__dirname + '/routes'));

app.get('/index.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/routes/index.html'), { title: "First Page"});
});

app.get('/secondfile.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/routes/secondfile.html'), { title: "Second Page"});
});






//Everything below here is needed to receive json objects from testjs.js, plus the require('fs') above

app.get('/data.json', function(req, res) {
	res.sendfile(path.join(__dirname + '/routes/data.json'), { title: "data.json"});
});



var fs = require("fs");
var parser = require("body-parser");
app.use(parser.json());



app.use(parser.urlencoded({extended : true}));
app.post("/data.json", function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring);
    response.end();
});

function sendJSON(jsonObject) {
	fs.writeFile(__dirname+ "/routes/data.json", jsonObject, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}


