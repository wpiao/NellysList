var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/items', function (req, res, next) {
  res.json({});
});

module.exports = router;
