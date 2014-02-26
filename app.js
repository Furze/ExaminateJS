
/**
 * Module dependencies.
 **/

var express = require('express');
var routes = require('./routes');
var aboutHandler = require('./routes/about');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var http = require('http');
var path = require('path');


var FACEBOOK_APP_ID = "427162887386428";
var FACEBOOK_APP_SECRET = "2c58b6b44fe3b970e09e1b8e0deb5716";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"//"http://examinate.azurewebsites.net/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));


app.get('/', routes.index);
app.get('/about', aboutHandler.about);
app.get('/login', routes.login);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',  passport.authenticate('facebook', { successRedirect: '/home',
        failureRedirect: '/login' }));

app.get('/home', ensureAuthenticated, function(req, res){
    res.render('home', { user: req.user, title: 'Examinate - Home' });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}



