var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var options = {
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'name': 'OmerGolan',
      'origin':'my-server' 
  }
}; 

router.get('/internship-NDA.pdf',(req,res)=>{
  console.log('response  on get NDA 1 :')
 res.sendFile(path.join(__dirname,'../docs/internship-NDA.pdf')  , options)
});
module.exports = router;
