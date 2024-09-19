const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Student", "Admin", "Instructor"]
        
    },
    additionalDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }],
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
    image: {
        type: String,
    },
    cryptoToken: {
        type: String,
        // default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: Date.now()
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseProgress"
    }],
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;