const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module

var options = {
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'name': 'OmerGolan',
        'origin':'my-server' 
    }
  };


  router.get('/internship-nda.pdf',(req,res)=>{
    console.log('response  on get NDA  :')
   res.sendFile(path.join(__dirname,'../docs/Internship-NDA.pdf')  , options)
  });

// get file to send 
router.get('/pdf.js',(req,res)=>{
    console.log('response on get to - pdfjs.js  :')
    res.sendFile(path.join(__dirname,'../pdfjs/build/pdf.js')  , options)
});
router.get('/pdf.worker.js',(req,res)=>{
    console.log('response on get to - pdf.worker  :')
    res.sendFile(path.join(__dirname,'../pdfjs/build/pdf.worker.js')  , options)
});

module.exports = router;