var db=require('../models/db');

exports.getData=function(res,schema,inputData){
	db[schema].find(function(err,data){
		if(!err)
			res.send(data);
	})
	
}