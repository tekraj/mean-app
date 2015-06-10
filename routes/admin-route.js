var express = require('express');
var router = express.Router();
var dbOperation=require('../models/adminDbOperation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/login', function(req, res, next) {
  res.render('login');
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

	}else if(operation=='logout'){

	}else{
		dbOperation[operation](res,schema,inputdata)
	}
});

module.exports = router;
