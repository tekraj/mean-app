"use strict";

var db=require('../models/db');
var paypal=require('paypal-rest-sdk');

exports.getData=function(res,schema,inputData){
	
	db[schema].find(inputData).sort({date:'desc'}).exec(function(err,data){
		if(!err)
			res.send(data);
		else
			res.send(err);
	});
}

exports.getJoinData=function(res,schema,inputData){

	if(schema=='brand'){
		db[schema].find(inputData).sort({date:'desc'}).populate({path:'category',select:'title _id'}).exec(function(err,docs){
			if(!err)
				res.send(docs);
			else
				res.send('false');
		})

	}else if(schema=='product'){
		db[schema].find(inputData).sort({date:'desc'}).populate({path:'category',select:'title _id'}).populate({path:'brand',select:'name _id'}).exec(function(err,docs){
			if(!err)
				res.send(docs);
			else
				res.send('false');
		})
	}
}


exports.getCartItem=function(res,schema,inputData,req){
	var cartItem=req.session.cart;
	var cartObj={_id:{$in:cartItem}};
	db[schema].find(cartObj).sort({date:'desc'}).exec(function(err,docs){
		if(!err)
			res.send(docs);
		else
			res.send('false');
	})
};

exports.addToCart=function(res,schema,inputData,req){


	if(req.session.cart!=undefined){


			var condition=true;

			for(var i=0;i<req.session.cart.length;i++){
				if(req.session.cart[i]==inputData.productId){
					condition=false;
				}
			}
			if(condition==true){
				req.session.cart.push(inputData.productId);
				res.send('true');
			}else{
				res.send('false');
			}
			
			
		}else{
			req.session.cart=[];
			req.session.cart.push(inputData.productId);
			res.send('true');
		}


}

exports.storeOrder=function(res,schema,inputData,req){
	req.session.order=inputData;
	res.send('true');
}

exports.getOrder=function(res,schema,inputData,req){
	res.send(req.session.order);
}

exports.insert=function(res,schema,inputData,req){

	var insertData=new db[schema](inputData);

	insertData.save(function(err,docs){
		if(!err){
			if(schema=='buyer'){
				req.session.buyer_id=docs._id;
			}
			res.send(docs);
		}
		else{
			res.send(err);
		}
	});
};


exports.updateBuyer=function (inputData,req,callback){

	var inputObj={_id:req.session.buyer_id}

	db.buyer.update(inputObj,inputData,{upsert: true},function(err,doc){

				if(!err && doc){
					return callback(doc);
				}
				else{
					return callback(err);
				}

				delete req.session.buyer_id;
	})
	
}
exports.login=function(res,schema,inputData,req){
	var userObj={username:inputData.username}

	db[schema].findOne(userObj,function(err,docs){


		if(!err){
			if(docs){

				docs.comparePassword(inputData.password,function(errs,isMatch){

					 if(!err && isMatch){
					 	req.session.member=docs;
					 	res.send('true');
					 }
					 	
					 else{
					 	res.send(errs);
					 }
					 	
				});
				
			}
			else{
				res.send(err);
			}
		}else{
			res.send(err);
		}
		
	});
}


exports.checkLogedIn=function(res,schema,inputData,req){
	if(req.session.member!=undefined)
		res.send(req.session.member);
	else
		res.send('false');
}

exports.insertOrder=function (res,schema,inputData,req){

	var message=[];
	var count=0;
	req.session.order=[];
	req.session.cart=[];
	inputData.forEach(function(docs){
		
		var doc=new db[schema](docs);
		doc.save(function(err){
			count++;
			if(!err){
				if(count==inputData.length){
					res.send('true');
				}
			}


		});

	})

}


exports.paypal=function(inputData,callback){

		var api= {
			"host" : "api.sandbox.paypal.com",
			"port" : "",
			"client_id" : "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
			"client_secret" : "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM"
		};

		paypal.configure(api);

		var paypalPayment = {
	        "intent": "sale",
	        "payer": {
	            "payment_method": "paypal"
	        },
	        "redirect_urls": {},
	        "transactions": [{
		        "amount": {
			        "currency": "USD"
		        }
	        }]
	    };

	    paypalPayment.transactions[0].amount.total = inputData.amount;
	    paypalPayment.redirect_urls.return_url = "http://localhost:3000/confirm_order";
	    paypalPayment.redirect_urls.cancel_url = "http://localhost:3000/#/order";
	    paypalPayment.transactions[0].description = inputData.description;

	    paypal.payment.create(paypalPayment, {}, function (err, resp) {

		    if (err) {
		       return callback(false);
		    }

			if (resp) {

				var link = resp.links;
				return callback(link);

			}else{
				return callback(false);
			}
		});
}