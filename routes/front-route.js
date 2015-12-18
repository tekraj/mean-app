var express = require('express');
var dbOperation=require('../models/frontDbOperation');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { productInCart:req.session.cart,member:req.session.member});
});

router.get('/logout',function(req,res,next){
	delete req.session.member;
	res.redirect('/');
});
router.get('/order',function(req,res,next){

	dbOperation.paypal(req.query,function(link){

		if(link!=false){
			for (var i = 0; i < link.length; i++) {
				if (link[i].rel === 'approval_url') {
					res.redirect(link[i].href);
				}
			}
		}else{
			res.send('false');
		}
		
	});

});

router.get('/confirm_order',function(req,res,next){
	var inputData=req.query;

	var data={};
	data.paypal_order_id=inputData.order_id;
	data.paypal_payment_id=inputData.paymentId;
	data.paypal_token=inputData.token;
	data.paypal_payer_id=inputData.PayerID;
	dbOperation.updateBuyer (data,req,function(result){
		res.send(result);
	});
})


router.post('*',function(req,res,next){
	var postReq=req.params[0];
	postReq=postReq.split('/');
	var schema=postReq[1];
	var operation=postReq[2];
	var inputData=req.body;
	dbOperation[operation](res,schema,inputData,req);
	
})

module.exports = router;


// ?order_id=dac4d920-a6f2-401b-ae59-f23f7856690d&paymentId=PAY-61N89046FP946162XKWGNVXA&token=EC-3T452881VB450525E&PayerID=C7P4LQ4ZG6