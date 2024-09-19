const express = require('express');
const { getCourseDetails, createCourse, getCourse } = require('../controller/course');
const { isInstructor, auth, isAdmin } = require('../middleware/auth_middleware');
const router = express.Router();

router.get('/course/CourseDetails', getCourseDetails)
router.post('/course/createCourses', auth, isInstructor, createCourse)
router.get('/course/getCourse', getCourse)


module.exports = router;
