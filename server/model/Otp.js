const mongoose = require('mongoose');
const sendMailer = require('../utils/nodemailer_config');
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await sendMailer(email, "Verify Your email By OTP", otp);
        console.log(mailResponse)
    } catch (error) {
        console.log("An Error Occur", error)
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp)
    next();
})

module.exports = mongoose.model('otp', otpSchema);
