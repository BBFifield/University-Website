var express = require("express");
var path = require("path");
var routes = require('./routes');
var http = require('http');

var app = express();

app.use(express.static(__dirname));

//all environments
app.set('port', process.env.PORT || 3337);
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



app.use(express.static(__dirname + '/routes'));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/data'));
//Everything below here is needed to receive json objects from testjs.js, plus the require('fs') above

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/public/index.html'), { title: "Home Page"});
});

var fs = require("fs");
var parser = require("body-parser");
app.use(parser.json());

app.use(parser.urlencoded({extended : true}));

app.post("/eventsArray.json", function(request, response) {
	console.log("in events json");
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/eventsArray.json");
    response.end();
});

app.post("/coursesArray.json", function(request, response) {
	console.log("in courses array json");
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/coursesArray.json");
    response.end();
});

app.post("/previousCourses.json", function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/previousCourses.json");
    response.end();
});

app.post("/stjohns.json", function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/stjohns.json");
    response.end();
});

app.post("/grenfell.json", function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/grenfell.json");
    response.end();
});

app.post("/marine.json", function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/marine.json");
    response.end();
});

app.post('/previousCourses.json', function(request, response) {
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/previousCourses.json");
    response.end();
});

app.post('/registerArray.json', function(request, response) {
	console.log("inside post");
	var jsonstring = JSON.stringify(request.body);
    console.log(request.body); // this line allways produce {}
    sendJSON(jsonstring, "/data/registerArray.json");
    response.end(); 
});


function sendJSON(jsonObject, path) {
	fs.writeFile(__dirname+ path, jsonObject, function(err) {
		console.log("inside writefile");
	    if(err) {
	        return console.log(err);
	    }
	});
	console.log("after writefile");
}