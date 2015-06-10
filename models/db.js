var mongoose=require('mongoose')
var url="mongodb://localhost:27017/mean-test";
mongoose.connect(url,function(err){
	if(!err){
		console.log('connected');
	}
});


var schema=mongoose.Schema;

var userSchema=new schema({
		fullanme:{
				type: String,
		        required: true
		    },
	    username:{
			type: String,
	        required: true,
	        unique: true
	    },
	    email:{
			type: String,
	        required: true,
	        unique: true
	    },
	    status:{
	    	type:Number,
	    	default:0
	    },
	    date:{
	    	type:Date,
	    	default:Date.now
	    }
	});


exports.user=mongoose.model('user',userSchema,'user');
