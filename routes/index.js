//INDEX PAGE
exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'Examinate - Home' });
};

//submit page
exports.submit = function(req, res){
    var nextQ = req.query.q;
    if(req.query.a){ //HANDLE ANSWERING Q
        var answer = req.query.a;
        if(answer ==='a' || answer === 'b' || answer === 'c' || answer === 'd' || answer ==='e' || answer === 'skip'){
            nextQ = +req.query.q+1;
        } else {
            res.redirect('/question?c=' + req.query.c +'&e='+ req.query.e +'&q=' + nextQ + '&error=true');
            //incorrect answer
        }
    } else { //is back
        nextQ = req.query.q-1;
    }
    res.redirect('/question?c=' + req.query.c +'&e='+ req.query.e +'&q=' + nextQ);
};


exports.question = function(req, res){
    var cAndE = 'c=' + req.query.c +'&e='+ req.query.e;
    var submitURL = '/submit?' + cAndE + '&q=' + req.query.q;
    var prevURL = '/question?' + cAndE +  '&q=' + (req.query.q-1);
    res.render('submit', { user: req.user, title: 'Examinate - Answer Questions', linkURL: submitURL, prevURL: prevURL, qnum: req.query.q, errorMessage: req.query.error});
};
//check page
exports.check = function(req, res){
  res.render('check', { user: req.user, title: 'Examinate - Check', url: req.url });
};

//add
exports.add = function(req, res){
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
