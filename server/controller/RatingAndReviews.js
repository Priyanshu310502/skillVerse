const RatingsAndReviewsModel = require('../model/RatingsAndReviews')
exports.create = async (req, res) => {
    try {
        // fetch data
        const { rating, reviews, courseId } = req.body;
        const userId = req.user.id;
        if (!rating || !reviews || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        // check user enrolled or not
        const courseDetails = await CourseModel.find({
            _id: courseId,
            studentsEnrolled: {
                // 1. Method  $in: [userId]    
                // 2. Method  $elemMatch: {userId}
                // 3. Method --------------
                $elemMatch: {
                    $eq: { userId }
                }
            }
        })
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'User not enrolled in this course'
            });
        }
        // user Already Review or Not
        const alreadyReview = await RatingsAndReviewsModel.find({
            user: userId,
            course: courseId
        });
        if (alreadyReview.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User already review this course'
            });
        }
        // create RatingsAndReviews
        const ratingsAndReviewsDetails = await RatingsAndReviewsModel.create({
            user: userId,
            course: courseId,
            rating: rating,
            reviews: reviews
        });

        // update course rating
        const updateCourese = await CourseModeel.findByIdAndUpdate({ _id: courseId }, {
            $push: {
                ratingAndreviews: ratingsAndReviewsDetails._id
            }
        }, {
            new: true
        })
        res.status(200).json({
            success: true,
            message: 'Review added successfully',
            data: ratingsAndReviewsDetails,
            course: updateCourese
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

exports.getAverageRatings = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'Course id is required'
            });
        }
        const result = await RatingsAndReviewsModel.aggregate([
            {
                $match: {
                    course: new Mongoose.Types.ObjectId(courseId) // Ensure the course ID is properly converted to an ObjectId
                }
            },
            {
                $group: {
                    _id: null, // Grouping by `null` means that the aggregation will calculate over the entire dataset
                    averageRating: {
                        $avg: '$rating' // Calculate the average of the `rating` field
                    }
                }
            }
        ]);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Average Rating',
                averageRating: result[0].averageRating
            });
        } else {   // if no reviews
            res.status(404).json({
                success: false,
                message: 'No reviews found for this course',
                averageRating: 0
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

exports.getAllratingsAndReviews = async (req, res) => {
    try {
        const allRatingsAndReviewsDetails = await RatingsAndReviewsModel.find({}).
            sort({ rating: "Desc" })
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec();

        res.status(200).json({
            success: true,
            message: 'All ratings and reviews',
            data: allRatingsAndReviewsDetails
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}