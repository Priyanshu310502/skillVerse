const otpModel = require('../model/otp');
const ProfileModel = require('../model/Profiles');
const UserModel = require('../model/user');
const otpGenerator = require('otp-generator')
const sendMailer = require('../utils/nodemailer_config');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { uploadToCloudinary } = require('../utils/cloudinary_config');
const sendOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User Already Registered' });
        }

        let Otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await otpModel.findOne({ otp: Otp });

        while (result) {
            Otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await otpModel.findOne({ otp: Otp });
        }
        // // Check if an OTP entry already exists for this email
        // let existingOtpEntry = await otpModel.findOne({ email });

        // if (existingOtpEntry) {
        //     // Update the existing OTP entry
        //     existingOtpEntry.otp = Otp;
        //     existingOtpEntry.createdAt = new Date(); // Update the createdAt timestamp if needed
        //     await existingOtpEntry.save();
        // } else {
        //     // Create a new OTP entry if none exists
        //     const newOtp = new otpModel({
        //         email,
        //         otp: Otp,
        //         createdAt: new Date() // Assuming you have a createdAt field in your schema
        //     });
        //     await newOtp.save();
        // }
        let newOtp = otpModel({ email, otp: Otp, createdAt: new Date() });
        await newOtp.save();

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            data: Otp,
            email: email
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const signUp = async (req, res) => {
    try {
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        if (!firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword) {
            return res.status(400).json({
                message: 'Fill all details properly'
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: 'User Already Registered'
            });
        }
        // most recent otp
        const recentOtp = await otpModel.findOne({ email: email }).sort({ createdAt: -1 });
        if (recentOtp.length === 0) {
            return res.status(400).json({
                message: 'OTP not found'
            });
        } else if (recentOtp.otp !== otp) {
            return res.status(400).json({
                message: 'OTP Invalid'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const profileData = await ProfileModel.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: null
        });
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
            contactNumber,
            accountType,
            additionalDetails: profileData,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error.message" + error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Fill all details properly'
            });
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Incorrect Password'
            });
        }
        const payLoads = {
            id: user._id,
            email: user.email,
            accountType: user.accountType
        };
        const token = jwt.sign(
            payLoads,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        user.token = token;
        user.password = password;

        const options = {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: true // set to true if your site is served via HTTPS
        }
        return res.cookie('token', token, options).status(200).json({
            success: true,
            message: 'User logged in successfully ho gya hai bhai',
            data: {
                token: token,
                user: user
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        if (!email || !oldPassword || !newPassword || confirmPassword) {
            return res.status(400).json({
                message: 'Fill all details properly'
            });
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Incorrect Password'
            });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const updateDetails = await UserModel.findOneAndUpdate(
            { email: email },
            { password: hashPassword },
            { new: true }
        )
        await sendMailer(email, 'Password changed Request',
            `Password changed successfully ${updateDetails}`//change after testing
        )
        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            data: updateDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }
}

const updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        console.log("userId:= ", userId)
        if (!displayPicture) {
            return res.status(400).json({
                message: 'No display picture provided'
            });
        }
        const response = await uploadToCloudinary(displayPicture, 'codehelp')
        const result = await UserModel.findByIdAndUpdate(userId, {
            image: response.secure_url
        }, {
            new: true
        });
        return res.status(200).json({
            success: true,
            message: 'Display picture updated successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
module.exports = { sendOTP, signUp, login, changePassword, updateDisplayPicture };