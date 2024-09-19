const CourseModel = require('../model/course');
const CategoryModel = require('../model/Category');
const UserModel = require('../model/user');
const {uploadToCloudinary} = require('../utils/cloudinary_config');

const createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag, instructions, category } = req.body;
        const thumbnail = req.files.imageFile;

        if (!courseName || !courseDescription || !price || !whatYouWillLearn || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userId = req.user.id;
        const instructorDetails = await UserModel.findById(userId)

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Instructor not found"
            })
        }

        const categoryId = await CategoryModel.findOne({_id:category});
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "TagId not found"
            })
        }
        // Upload the thumbnail image to Cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnail, 'codehelp');
        if (!thumbnailImage || !thumbnailImage.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image"
            });
        }

        const newcourse = new CourseModel({
            courseName,
            courseDescription,
            whatYouWillLearn,
            instructor: instructorDetails._id, //check this
            price,
            thumbnail: thumbnailImage.secure_url,
            category: categoryId._id,
            tag,
            instructions,

        });
        await newcourse.save();

        // Instructor's course push in User DB
        await UserModel.findByIdAndUpdate({ _id: instructorDetails._id },
            {
                $push: {
                    course: newcourse._id
                }
            },
            { new: true }
        )

        // CourseId push in tag DB
        await CategoryModel.findByIdAndUpdate({ _id: categoryId._id },
            {
                $push: {
                    course: newcourse._id
                }
            },
            { new: true }
        )

        res.json({
            success: true,
            message: "Course created successfully",
            data: newcourse
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            succss: false,
            message: error.message
        })

    }
}

const getCourse = async (req, res) => {
    try {
        const getCourse = await CourseModel.find({}, {
            courseName: 1,
            price: 1,
            Instructor: 1,
            thumbnail: 1,
            ratingAndreviews: 1,
            studentsEnrolled: 1
        }).populate('Instructor').exec();
        res.json({
            success: true,
            message: "Courses fetched successfully",
            data: getCourse
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            succss: false,
            message: error.message
        })

    }
}

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "CourseId is required"
            })
        }
        const courseDetails = await CourseModel.find({
            _id: courseId
        })
            .populate({
                path: 'Instructor',
                populate: {
                    path: 'course'
                }
            })
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subsection',
                }
            })
            .populate('ratingAndreviews')
            .populate('category')
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        res.json({
            success: true,
            message: "Course fetched successfully",
            data: courseDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            succss: false,
            message: error.message
        })

    }
}
module.exports = { getCourseDetails, createCourse, getCourse }