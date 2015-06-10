var express = require('express');
var router = express.Router();

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
module.exports = router;
