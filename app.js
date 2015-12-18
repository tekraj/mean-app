var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');

var session=require('express-session');
var mongoose=require('mongoose');
var MongoStore=require('connect-mongo')(session);



var frontRoute = require('./routes/front-route');
var adminRoute = require('./routes/admin-route');

var app = express();


var conf={
  db:{
    db:'mean-test',
    host:'127.0.0.1',
    port:'27017',
    username:'',
    password:'',
    collection:'adminSession'
  },
  secret:'32sdafdsdklfjkl3'
}


app.use(session({
    secret: conf.secret,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie:{secure:false},
    maxAge:new Date(Date.now())+3600000,
    store: new MongoStore(conf.db) 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
  dest: './public/uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  }
}))

app.use('/admin', adminRoute);
app.use('/', frontRoute);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000)

// module.exports = app;

