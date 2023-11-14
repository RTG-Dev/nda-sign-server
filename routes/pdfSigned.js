const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const pdfSignedController = require('../controllers/pdfSignedController');


// middlewareto get pdf file from charGPT
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/') // Ensure this directory exists
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({ storage: storage });
router.post('/', upload.single('file'),(req, res) => pdfSignedController.savePdf(req, res));

module.exports = router;