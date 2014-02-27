
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Examinate - Home' });
};

exports.login = function(req, res){
    res.render('indexLogin', { title: 'Examinate - Login' });
};
exports.about = function(req, res){
    res.render('indexAbout', { title: 'Examinate - About' });
};