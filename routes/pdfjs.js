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
    console.log('response on get to - pdfjs  :',__dirname)
    res.sendFile(path.join(__dirname,'../pdfjs/build/pdf.js')  , options)
});

module.exports = router;