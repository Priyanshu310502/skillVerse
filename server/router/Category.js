const express = require('express');
const { createCategory, showAllCategory, categoryPageDetails } = require('../controller/Category');
const { isAdmin, auth } = require('../middleware/auth_middleware');
const router = express.Router();

router.post('/course/createCategory', auth, isAdmin, createCategory)
router.get('/course/showAllCategories', showAllCategory)
router.get('/course/categoryPageDetails', categoryPageDetails)


module.exports = router;
