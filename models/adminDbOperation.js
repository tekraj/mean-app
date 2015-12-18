"use strict";
var db=require('../models/db');

exports.getData=function(res,schema,inputData){
	var queryObj={};

	if(Object.keys(inputData).length>0){
		if(inputData.searchParam.searchby!=undefined){
			queryObj[inputData.searchParam.searchby]=new RegExp(inputData.searchParam.searchkey,'i');
		}else{
			queryObj=inputData.searchParam;
		}
		
	}
	var limit=inputData.limitParam.limit ? inputData.limitParam.limit : 0;

	var offset=inputData.limitParam.page ? (inputData.limitParam.page-1) * limit : 0; 


	db[schema].find(queryObj).skip(offset).limit(limit).sort({date:'desc'}).exec(function(err,data){
		if(!err)
			res.send(data);
		else
			res.send(err);
	});
}

exports.getJoinData=function(res,schema,inputData){
	
	var queryObj={};
	if(Object.keys(inputData).length>0){
		if(inputData.searchParam.searchby!=undefined){
			queryObj[inputData.searchParam.searchby]=new RegExp(inputData.searchParam.searchkey,'i');
		}else{
			queryObj=inputData.searchParam;
		}
		
	}
	var limit=inputData.limitParam.limit ? inputData.limitParam.limit :0;
	var offset=inputData.limitParam.page ? (inputData.limitParam.page-1) * limit : 0; 
	
	if(schema=='brand'){
		db[schema].find(queryObj).skip(offset).limit(limit).sort({date:'desc'}).populate({path:'category',select:'title _id'}).exec(function(err,data){
			if(!err)
				res.send(data);
		});

	}else if(schema=='product'){

		db[schema].find(queryObj).skip(offset).limit(limit).sort({date:'desc'}).populate({path:'category',select:'_id title'}).populate({path:'brand',select:'_id name'}).exec(function(err,data){
			if(!err)
				res.send(data);
		});

	}else if(schema=='order'){

		db[schema].find(queryObj).skip(offset).limit(limit).sort({date:'desc'}).populate({path:'buyer',select:'_id buyer_name'}).populate({path:'product',select:'_id name'}).exec(function(err,data){
			if(!err)
				res.send(data);
		});

	}else if(schema=='cms_post'){

		db[schema].find(queryObj).skip(offset).limit(limit).sort({date:'desc'}).populate({path:'cms_category',select:'_id title'}).exec(function(err,data){
			if(!err)
				res.send(data);
		});

	}
}



exports.insert=function(res,schema,inputData){

	if(Object.keys(inputData).length >0){
		var dbschema=db[schema];
		var dataObj=new dbschema(inputData);
		dataObj.save(function(err,doc){
			if(!err && doc)
				res.send('true');
			else
				res.send(err);
		});
	}else{
		res.send('false');
	}
	
}

exports.update=function (res,schema,inputData){

	if(Object.keys(inputData).length >0){

		var inputObj={_id:inputData._id}
		delete inputData._id;

		if(schema=='user' || schema=='member'){
			db[schema].findOne(inputObj,function(err,doc){

				if(!err && doc){
					doc.fullname=inputData.fullname,
					doc.username=inputData.username,
					doc.email=inputData.email,
					doc.password=inputData.password,
					doc.status=inputData.status

					doc.save(function(err,result){
						if(!err && result)
							res.send('true')
						else
							res.send('false');
					})
				}

			});
		}else if(schema=='order'){

			db[schema].update(
				inputData,
				{$set:{status:1}},
				{multi:true},
				function(err,doc){
					if(!err)
						res.send('true');
					else
						res.send('false');
				}
			);

		}else{

			db[schema].update(inputObj,inputData,{upsert: true},function(err,doc){
				if(!err && doc)
					res.send('true');
				else
					res.send('false');
			})
		}

	}else{
		res.send('false');
	}
	
}

exports.delete=function(res,schema,inputData){
	db[schema].remove(inputData,function(err){
		if(!err)
			res.send('true');
		else
			res.send('false');
	})
}



exports.login=function(schema,inputData,callback){

	var userObj={username:inputData.username}

	db[schema].findOne(userObj,function(err,docs){


		if(!err){
			if(docs){

				docs.comparePassword(inputData.password,function(err,isMatch){

					 if(!err && isMatch)
					 	return callback(true);
					 else
					 	return callback(false);
				});
				
			}
			else{
				return callback(false);
			}
		}else{
			return callback(false);
		}
		
	});
}

	
