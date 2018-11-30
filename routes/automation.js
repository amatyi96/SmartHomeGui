var express = require('express');
var router = express.Router();

/* GET automation listing. */
router.get('/', function(req, res, next) {
  res.render('automation', { title: 'Automation'});
});

module.exports = router;