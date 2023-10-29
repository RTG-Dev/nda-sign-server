const express = require('express');
const router = express.Router();
const pdfSignedController = require('../controllers/pdfSignedController');

router.post('/',(req, res) => pdfSignedController.savePdf(req, res));

module.exports = router;