var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index');
});

// http://localhost:3000/login
router.get('/login', function(req, res, next) {
  res.render('user/login')
})

// http://localhost:3000/register
router.get('/register', function(req, res, next) {
  res.render('user/register')
})

module.exports = router;
