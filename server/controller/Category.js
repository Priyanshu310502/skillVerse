const Category = require('../model/Category');
const CategoryModel = require('../model/Category')
const courseModel = require('../model/course');

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        };
        const CategoryDetails = await CategoryModel.create({
            name,
            description,
        });
        res.status(200).json({
            success: true,
            data: CategoryDetails,
            message: 'Category created successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const showAllCategory = async (req, res) => {
    try {
        const getCategoryDetails = await CategoryModel.find({},
            { name: true, description: true })
        res.status(200).json({
            success: true,
            data: getCategoryDetails,
            message: 'Category details fetched successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const categoryPageDetails = async (req, res) => {
    try {
        // get Category Id
        const { categoryId } = req.body;

        // check id null or not
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: 'Category id is required'
            });
        };
        // get Selected category details
        const selectCategory = await CategoryModel.findOne({ _id: categoryId })
            .populate("courses")
            .exec();
        if (!selectCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        // get Different Category details
        const differentCategory = await CategoryModel.find({
            _id: { $ne: categoryId }
        })
            .populate("courses")
            .exec();

        // get Top selling Courses
        const topSellingCourses = await courseModel.aggregate([
            {
                $addFields: {
                    studentCount: { $size: "$studentsEnrolled" } // Add a field 'studentCount' with the number of students
                }
            },
            {
                $sort: { studentCount: -1 } // Sort by 'studentCount' in descending order
            },
            {
                $limit: 6 // Limit the results to the top 6 courses
            }
        ]).exec();

        res.status(200).json({
            success: true,
            data: {
                selectCategory,
                differentCategory,
                topSellingCourses
            },
            message: 'Category details fetched successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });


    }
}
module.exports = { createCategory, showAllCategory, categoryPageDetails }