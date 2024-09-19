const mongoose = require('mongoose')
const RatingAndReviewsSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('ratingAndreviews', RatingAndReviewsSchema);
