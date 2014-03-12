
exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'Examinate - Home' });
};

exports.submit = function(req, res){
	res.render('submitIndex', { user: req.user, title: 'Examinate - Submit'});
};

exports.check = function(req, res){
	res.render('checkIndex', { user: req.user, title: 'Examinate - Check' });
};

exports.modify = function(req, res){
	res.render('modifyIndex', { user: req.user, title: 'Examinate - modify' });
};

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
};

exports.login = function(req, res){
    res.render('indexLogin', { title: 'Examinate - Login' });
};
exports.about = function(req, res){
    res.render('indexAbout', { title: 'Examinate - About' });
};
