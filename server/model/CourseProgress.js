const mongoose = require('mongoose')
const courseProgressSchema = new mongoose.Schema({
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
    completedVideo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsection"
    }],

})

module.exports = mongoose.model('courseProgress', courseProgressSchema);
