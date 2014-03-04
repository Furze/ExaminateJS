
/**
 * Module dependencies.
 **/

var express = require('express');
var routes = require('./routes');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var http = require('http');
var path = require('path');
var mysql      = require('mysql');


var FACEBOOK_APP_ID = "427162887386428";
var FACEBOOK_APP_SECRET = "2c58b6b44fe3b970e09e1b8e0deb5716";

var connection = mysql.createConnection({
    host     : 'ep9gru174l.database.windows.net',
    user     : 'flamingo',
    password : 'IWishICouldRememberAllThis#69',
    port: 1433
});


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
        //callbackURL: "http://examinate.azurewebsites.net/auth/facebook/callback"
        callbackURL: "http://localhost:3000/auth/facebook/callback"

    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));


//app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/login', routes.login);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',  passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));

app.get('/', function(req, res){
    res.render('index', { user: req.user, title: 'Examinate - Home' });
});

app.get('/submit', ensureAuthenticated, function(req, res){
    var result;
    //if(req.query.searchTerm){
        connection.query('SELECT * FROM *', function(err, rows) {
            if(err) {return console.log(err);}// connected! (unless `err` is set)
            console.log(rows);
            result= rows;
        });
        //SQL TO GET ALL COURSES
       //RESULT TO JSON
   // }
    res.render('submitIndex', { user: req.user, title: 'Examinate - Submit', result: result });
});
app.get('/check', ensureAuthenticated, function(req, res){
    res.render('checkIndex', { user: req.user, title: 'Examinate - Check' });
});
app.get('/modify', ensureAuthenticated, function(req, res){
    res.render('modifyIndex', { user: req.user, title: 'Examinate - modify' });
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



