//INDEX PAGE
var http = require('http');

var options = {
    host: 'examinatedb.azurewebsites.net',
    path: '/getcourses'
};


exports.index = function(req, res){

  if(req.user !== null){
      //TODO QUERY DATABASE AND GET USERS COURSES HERE
      var userCourses = "test";
      var getCourses = http.get(options, function(resp) {
          var bodyChunks = [];
          resp.on('data', function(chunk) {
             bodyChunks.push(chunk);
          }).on('end', function() {
                  var body = Buffer.concat(bodyChunks);
                  console.log(body);
                  res.render('index', { user: req.user, title: 'Examinate - Home', courses: JSON.parse(body)});
              })
      });
      return;
  }
 res.render('index', { user: req.user, title: 'Examinate - Home'});
};

//submit page
exports.submit = function(req, res){
    var nextQ = req.query.q;
    if(req.query.a){ //HANDLE ANSWERING Q
        var answer = req.query.a;
        if(answer ==='a' || answer === 'b' || answer === 'c' || answer === 'd' || answer ==='e' || answer === 'skip'){
            nextQ = +req.query.q+1;
            //TODO: SUBMIT TO QUEUE HERE
        } else {
            //incorrect answer
            res.redirect('/question?c=' + req.query.c +'&e='+ req.query.e +'&q=' + nextQ + '&error=true'); //TODO isn't showing ):
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
