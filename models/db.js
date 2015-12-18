var mongoose=require('mongoose');
var url="mongodb://127.0.0.1:27017/mean-test";
mongoose.connect(url,function(err){
	if(!err)
		console.log('connected');
    else 
        console.log(err);
});


var schema=mongoose.Schema;

var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR=10;


var userSchema=new schema({
		fullname:{type: String,required: true},
	    username:{type: String,required: true,unique: true},
	    email:{type: String,required: true,unique: true},
	    password:{type:String,required:true},
	    status:{type:Boolean,default:1},
	    date:{type:Date,default:Date.now}
	});


userSchema.pre('save',function(next){

	var user=this;

	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    	if(err)
    		return next(err);

    	// hash the password along with our new salt
    	bcrypt.hash(user.password,salt,function(err,hash){
    		if(err)
    			return next(err);

    		// override the cleartext password with hashed one
    		user.password=hash;
    		next();

    	});
    })

});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var memberSchema=new schema({
		fullname:{type: String,required: true},
	    username:{type: String,required: true,unique: true},
	    email:{type: String,required: true,unique: true},
	    password:{type:String,required:true},
	    status:{type:Boolean,default:0},
	    date:{type:Date,default:Date.now}
	});

memberSchema.pre('save',function(next){

	var member=this;

	// only hash the password if it has been modified (or is new)
    if (!member.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    	if(err)
    		return next(err);

    	// hash the password along with our new salt
    	bcrypt.hash(member.password,salt,function(err,hash){
    		if(err)
    			return next(err);

    		// override the cleartext password with hashed one
    		member.password=hash;
    		next();

    	});
    })

});


memberSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var categorySchema=new schema({
		title:{type: String,required: true},
	    url:{type: String,required: true,unique: true},
	    seodesc:{type:String},
	    status:{type:Boolean,default:0},
	    date:{type:Date,default:Date.now}
	});


var brandSchema=new schema({
		name:{type: String,required: true},
	    url:{type: String,required: true,unique: true},
	    seodesc:{type:String},
	    category:{type:schema.Types.ObjectId,ref:'category'},
	    image:{type:String},
	    status:{type:Boolean,default:0},
	    date:{type:Date,default:Date.now}
	});


var productSchema=new schema({
	name:{type: String,required: true},
    url:{type: String,required: true,unique: true},
    category:{type:schema.Types.ObjectId,ref:'category'},
    brand:{type:schema.Types.ObjectId,ref:'brand'},
    seodesc:{type:String},
    detail:{type:String},
    price:{type:Number},
    image:{type:String},
    slider:{},
    status:{type:Boolean,default:0},
    date:{type:Date,default:Date.now}
});

var buyerSchema=new schema({
    buyer_name:{type:String,required:true},
    mobile:{type:Number,required:true},
    address:{type:String,required:true},
    postal:{type:String},
    payment_method:{type:String,required:true},
    amount:{type:Number,required:true},
    member_id:{type:schema.Types.ObjectId,ref:'member'},
    order_id:{type:String,required:true,unique:true},
    delivered_by:{type:String},
    delivery_date:{type:Date},
    paypal_order_id:{type:String},
    paypal_payment_id:{type:String},
    paypal_token:{type:String},
    paypal_payer_id:{type:String},
    status:{type:Boolean,default:0},
    date:{type:Date,default:Date.now}
});

var orderSchema=new schema({
    product:{type:schema.Types.ObjectId,ref:'product'},
    item:{type:Number,default:1},
    buyer:{type:schema.Types.ObjectId,ref:'buyer'},
    order_id:{type:String,required:true},
    status:{type:Boolean,default:0},
    date:{type:Date,default:Date.now}
});

var cms_categorySchema=new schema({
        title:{type: String,required: true},
        url:{type: String,required: true,unique: true},
        seodesc:{type:String},
        status:{type:Boolean,default:0},
        date:{type:Date,default:Date.now}
    });

var cms_postSchema=new schema({
        name:{type: String,required: true},
        url:{type: String,required: true,unique: true},
        seodesc:{type:String},
        detail:{type:String},
        cms_category:{type:schema.Types.ObjectId,ref:'category'},
        image:{type:String},
        status:{type:Boolean,default:0},
        date:{type:Date,default:Date.now}
    });


exports.user=mongoose.model('user',userSchema,'user');
exports.member=mongoose.model('member',memberSchema,'member');
exports.category=mongoose.model('category',categorySchema,'category');
exports.brand=mongoose.model('brand',brandSchema,'brand');
exports.product=mongoose.model('product',productSchema,'product');
exports.buyer=mongoose.model('buyer',buyerSchema,'buyer');
exports.order=mongoose.model('order',orderSchema,'order');
exports.cms_category=mongoose.model('cms_category',cms_categorySchema,'cms_category');
exports.cms_post=mongoose.model('cms_post',cms_postSchema,'cms_post');