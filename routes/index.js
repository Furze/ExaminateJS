//INDEX PAGE
exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'Examinate - Home' });
};

//submit page
exports.submit = function(req, res){
	res.render('submit', { user: req.user, title: 'Examinate - Submit', qnum: req.query.q, qnext: (req.query.q++), qprev: (req.query.q-1)});
};

//check page
exports.check = function(req, res){
    //TODO:  DB TESTING AREA
  res.render('check', { user: req.user, title: 'Examinate - Check', url: req.url });
};

//modify page
exports.modify = function(req, res){
	res.render('modify', { user: req.user, title: 'Examinate - modify' });
};
//modify page
exports.landign = function(req, res){
    res.render('courseLanding', { user: req.user, title: 'Examinate - CompSci 101' });
};


//logout
exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
};

//login error
exports.loginError = function(req, res){
    res.render('loginError', { title: 'Examinate - Login' });
};

//index about
exports.about = function(req, res){
    res.render('about', { title: 'Examinate - About' });
};

//course landing page
exports.courseLanding = function(req, res){
  res.render('courseLanding', { user: req.user, title: "Examinate - CompSci 101"});
};
