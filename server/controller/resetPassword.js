const otpModel = require('../model/otp');
const UserModel = require('../model/user');
const cypto = require('crypto');
const sendMailer = require('../utils/nodemailer_config');
const bcrypt = require('bcrypt')
const resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        const cryptoToken = crypto.randomUUID();
        console.log("cryptoToken:- ", cryptoToken)
        const updateDetails = await UserModel.findOneAndUpdate(
            { email: email },
            {
                cryptoToken: cryptoToken,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        )

        const url = `http://localhost:3000/update-passwod/${cryptoToken}`;
        await sendMailer(email, 'Reset Password Url ', url);

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email',
            // user: updateDetails
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        });

    }
}

const resetPassword = async (req, res) => {
    try {
        const { cryptoToken, password, confirmPassword } = req.body;
        const user = await UserModel.find({ cryptoToken: cryptoToken });
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        if (!password || !confirmPassword) {
            return res.status(400).json({
                error: 'Password and Confirm Password are required'
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'Password and Confirm Password does not match'
            });
        }
        if (user.resetPasswordExpires < Date.now) {
            return res.status(400).json({
                error: 'Reset password link has expired'
            });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await UserModel.findOneAndUpdate(
            { cryptoToken: cryptoToken },
            { password: hashedPassword },
            { new: true });
        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        });

    }
}
module.exports = { resetPasswordToken, resetPassword }