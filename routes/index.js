
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Examinate - Home' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Examinate - login' });
};