
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.get('/', routes.index);

app.get('/stJohns/StJohnsCourses', function(req, res) {
	res.render('StJohnsCourses.hjs', { title: "St. John's"});
});

app.get('/marine/marineCourses', function(req, res) {
	res.render('marineCourses.hjs', { title: "Marine Insitute"});
});

app.get('/grenfell/grenfellCourses', function(req, res) {
	res.render('grenfellCourses.hjs', { title: "Grenfell Campus"});
});

app.get('/stJohns/previousCourses', function(req, res) {
	res.render('previousCourses.hjs', { title: "St. John's"});
});

app.get('/marine/previousCourses', function(req, res) {
	res.render('previousCourses.hjs', { title: "Marine Insitute"});
});

app.get('/grenfell/previousCourses', function(req, res) {
	res.render('previousCourses.hjs', { title: "Grenfell Campus"});
});



