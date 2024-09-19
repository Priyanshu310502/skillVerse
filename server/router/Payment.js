const express = require('express');
const { verifySignature, CapturePayment } = require('../controller/Payment');
const router = express.Router();

router.post('/verifySignature', verifySignature)
router.post('/CapturePayment', CapturePayment)


module.exports = router;
