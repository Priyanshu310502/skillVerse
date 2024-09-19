const express = require('express');
const { sendOTP, login, changePassword, signUp, updateDisplayPicture } = require('../controller/Auth');
const { auth, isStudent, isInstructor, isAdmin } = require('../middleware/auth_middleware');
const { resetPasswordToken, resetPassword } = require('../controller/resetPassword');
const { updateProfile, getProfile, deleteProfile } = require('../controller/profile')

const router = express.Router();
router.post('/auth/sendotp', sendOTP)
router.post('/auth/signup', signUp)
router.post('/auth/login', login)
router.post('/auth/changepassword', changePassword);
router.post('/auth/reset-password-token', resetPasswordToken)
router.post('/auth/reset-password', resetPassword
)

router.put('/profile/updateDisplayPicture', auth, updateDisplayPicture)
router.put('/profile/updateProfile', auth, updateProfile)
router.get('/profile/getUserDetails', auth, getProfile)
router.delete('/profile/deleteProfile', auth, isStudent, deleteProfile)

module.exports = router;
