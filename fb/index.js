var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "427162887386428";
var FACEBOOK_APP_SECRET = "2c58b6b44fe3b970e09e1b8e0deb5716";

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	//callbackURL: "http://examinate.co.nz/auth/facebook/callback"
	callbackURL: "http://localhost:3000/auth/facebook/callback"
},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {
			return done(null, profile);
		});
	}
));

exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}
exports.passport = passport;