const SectionModel = require('../model/section');
const CourseModel = require('../model/course');

const createSection = async (req, res) => {
    try {
        // fetch request body fields
        const { courseId, sectionName } = req.body;

        // validate request fields are provided or not
        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: 'courseId and sectionName are required'
            });
        }

        // save section in db
        const response = await SectionModel({ sectionName }).save();
        // update course's sections array with new section's id
        const updatedCourses = await CourseModel.findByIdAndUpdate(courseId,
            { $push: { courseContent: response._id } },
            { new: true }
        )


        // send response with updated course's sections array
        res.status(200).json({
            success: true,
            data: updatedCourses,
            message: 'Section created successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.body;
        const deletedSction = await SectionModel.findOneAndDelete({
            _id: sectionId
        });
        if (!deletedSction) {
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            });
        }

        // // update course's sections array to remove deleted section's id
        // const updatedCourses = await CourseModel.findByIdAndUpdate(deletedSction.courseId,
        //     { $pull: { sections: sectionId } },
        //     { new: true }
        // ).populate('sections')
        //     .exec();

        // send response with updated course's sections array
        res.status(200).json({
            success: true,
            data: updatedCourses,
            message: 'Section deleted successfully'
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = { createSection, deleteSection };