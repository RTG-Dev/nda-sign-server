const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfSignedController = require('../controllers/pdfSignedController');

// middleware to get pdf file from front
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './docs/nda') // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null,  new Date().toLocaleDateString("he-IL").split("/") +'-'+  file.originalname)  // path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage });

// incoming pdf from vanila javascript project
router.post('/',(req, res) => pdfSignedController.savePdf(req, res)); 
// incoming pdf from angular project
router.post('/angularProject', upload.single('file'),(req, res) => pdfSignedController.savePdfAngularProject(req, res));


module.exports = router;