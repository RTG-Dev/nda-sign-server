const express = require('express');
const router = express.Router();

// get file to send 
router.get('/',(req,res)=>{
    console.log('response  on get NDA 1 :')
   res.sendFile(path.join(__dirname,'./pdfjs/build/pdf.js')  , options)
  });

module.exports = router;