const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    CourseDescription: {
        type: String,
    },
    instructor: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }],
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'section'
    }],
    ratingAndreviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ratingAndreview'
    }],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
    },
    category: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    }],
    studentsEnrolled: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ['Draft', 'Publshid'],
        default: 'Draft',
    },
})

module.exports = mongoose.model('course', courseSchema);
