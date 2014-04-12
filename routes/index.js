//INDEX PAGE
var http = require('http');

var onlineServer = 'db.examinate.co.nz';
var testingServer = 'localhost'; //LOCAL TESTING
var server = onlineServer;//testingServer;
var poort = 80;//3001

exports.index = function(req, res){

  if(req.user){
      var options = {
          host: server,
          port: poort, //ONLY FOR LOCAL TESTING*/
          path: '/getcourses?uID=' + req.user.id
      };

      var getCourses = http.get(options, function(resp) {
          var bodyChunks = [];
          resp.on('data', function(chunk) {
             bodyChunks.push(chunk);
          }).on('end', function() {
                  var body = Buffer.concat(bodyChunks);
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
            var options = {
                host: server,
                 port: poort,
                path: '/submitanswer?uID=' + req.user.id + '&c='+req.query.c + '&e=' + req.query.e + '&q=' + req.query.q + '&a=' + req.query.a
            };

            var submitAnswer = http.get(options, function(resp) {
                var bodyChunks = [];
                resp.on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                        var body = Buffer.concat(bodyChunks);
                 })
            });
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
    if(req.user && req.query.c){
        var course = req.query.c;
        var user = req.user.id;
        var exam = req.query.e;
        var options = {
            host: server,
            port: poort, //ONLY FOR LOCAL TESTING*/
            path: '/getanswers?uID=' + user + '&c=' + course + '&e=' + exam
        };

        var getExams = http.get(options, function(resp) {
            var bodyChunks = [];
            resp.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    //TODO: change check.jade for dynamic loading
                    res.render('check', { user: req.user, title: 'Examinate - ' + course, answers: JSON.parse(body), course: course, exam: exam, url: req.url});
                })
        });
        return;
    }
    //TODO: error page with error message
 // res.render('check', { user: req.user, title: 'Examinate - Check', url: req.url });
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
    if(req.user && req.query.c){
        var course = req.query.c;
        var options = {
            host: server,
            port: poort, //ONLY FOR LOCAL TESTING*/
            path: '/getexams?uID=' + req.user.id + '&c=' + course
        };

        var getExams = http.get(options, function(resp) {
            var bodyChunks = [];
            resp.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    res.render('courseLanding', { user: req.user, title: 'Examinate - ' + course, exams: JSON.parse(body), course: course});
                })
        });
        return;
    }
 //TODO: error page with error message  ?
 // res.render('courseLanding', { user: req.user, title: "Examinate - " + course});
};
