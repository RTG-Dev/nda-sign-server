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

// get file to send 
router.get('/',(req,res)=>{
    console.log('response on get to - pdfjs.js  :',__dirname)
    res.sendFile(path.join(__dirname,'../pdfjs/build/pdf.js')  , options)
});
router.get('/pdf.worker',(req,res)=>{
    console.log('response on get to - pdf.worker  :',__dirname)
    res.sendFile(path.join(__dirname,'../pdfjs/build/pdf.worker.js')  , options)
});

module.exports = router;