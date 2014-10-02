
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();

// all environments
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server=http.createServer(app);
app.set('port', process.env.PORT || 3000);
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');  
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/carItHome', function(req, res) {     res.sendfile('./views/QandA.html'); });


server.listen(app.get('port'),app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});