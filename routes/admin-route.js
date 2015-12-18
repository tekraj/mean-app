var express = require('express');
var router = express.Router();
var dbOperation=require('../models/adminDbOperation');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var sess=req.session;
	if(sess.userData){
  		res.render('admin');
	}
  	else{
  		res.redirect('/admin/login');
  	}
});

router.get('/login', function(req, res, next) {
  res.render('login',{message:req.session.message});
});
router.get('/logout', function(req, res, next) {
  req.session.userData=false;
  res.redirect('login');
});

router.get('*', function(req, res, next) {
  res.render('error',{message:'Page Not Found'});
});

// send response on post request

router.post('*',function(req,res,next){
	
	var postReq=req.params[0];
	postReq=postReq.split("/");
	var schema=postReq[1];
	var operation=postReq[2];
	var inputdata=req.body;
	if(operation=='login'){
		dbOperation[operation](schema,inputdata,function(cond){
			if(cond==true){

				req.session.userData=inputdata.username;
				res.redirect('/admin');
			}else{
				req.session.message="Invalid Email or Password";
				res.redirect('/admin/login');
			}
		})
	}else if(operation=='upload'){
		res.send('true');
	}
	else{
		dbOperation[operation](res,schema,inputdata)
	}
});

module.exports = router;
