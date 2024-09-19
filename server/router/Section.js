const express = require('express');
const { createSection, deleteSection } = require('../controller/section');
const { auth } = require('../middleware/auth_middleware');
const router = express.Router();

router.post('/course/addSection', auth,createSection)
router.delete('/deleteSection', deleteSection)


module.exports = router;
