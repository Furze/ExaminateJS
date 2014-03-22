
/**
 * Module dependencies.
 **/

var express = require('express');
var routes  = require('./routes');
var url     = require("url");
var fb      = require('./fb');
var http    = require('http');
var path    = require('path');
var db      = require('./models')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon()); //TODO: our own favicon
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('C4NTTOUCHTHIS')); //TODO: randomly generated string
app.use(express.session());
app.use(fb.passport.initialize());
app.use(fb.passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//pages without user logged in
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/login', routes.loginError);
app.get('/logout', routes.logout);

//pages requiring fb login
app.get('/submit', fb.ensureAuthenticated, routes.submit);
app.get('/check', fb.ensureAuthenticated, routes.check);
app.get('/modify', fb.ensureAuthenticated, routes.modify);

//TEMP
app.get('/courselanding', fb.ensureAuthenticated, routes.modify)
//fb auth pages
app.get('/auth/facebook', fb.passport.authenticate('facebook'));
app.get('/auth/facebook/callback',  fb.passport.authenticate('facebook', { successRedirect: '/',   failureRedirect: '/login' }));

//UNCOMMENT BELLOW and COMMENT http. ONWARDS for sql NOT NEEDED FOR STATIC
/*db
	.sequelize
	.sync({ force: true })
	.complete(function(err) {
		if (err) {
			console.log(err);
			throw err
		} else {
			http.createServer(app).listen(app.get('port'), function(){
				console.log('Express server listening on port ' + app.get('port'))
			})
		}
	})
*/
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
}); //SAVING INCASE sequelize is shit