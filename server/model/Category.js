const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
   
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
})

module.exports = mongoose.model('category', tagSchema);
