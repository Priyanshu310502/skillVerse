const express = require('express');
const router = express.Router();
const { createSubsection, deleteSubsection, updateSubsection } = require('../controller/subsection');
const { isInstructor, auth } = require('../middleware/auth_middleware');

router.post('/course/addSubSection', auth, isInstructor, createSubsection)
router.post('/deleteSubsection', deleteSubsection)
router.post('/updateSubsection', updateSubsection)


module.exports = router;
