var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ndaToSign', { urlPort: `${process.env.serverURL}:${process.env.PORT}`});
});

module.exports = router;
