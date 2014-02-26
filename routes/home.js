/**
 * Created by troy on 27/02/14.
 */
exports.home = function(req, res){
    res.render('home', {  user: req.user });
};