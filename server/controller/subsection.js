const SubsectionModel = require('../model/subsection');
const SectionModel = require('../model/section');
const { uploadToCloudinary } = require('../utils/cloudinary_config');

const createSubsection = async (req, res) => {
    try {
        const { sectionId, title, description, timeDuration } = req.body;
        const video = req.files.videoFile;
        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            })
        }
        const videoUpload = await uploadToCloudinary(video, "codehelp");
        const newSubsection = await SubsectionModel.create({
            title,
            description,
            timeDuration,
            videoUrl: videoUpload.secure_url,
        })
        const updatedSections = await SectionModel.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subsection: newSubsection._id
                }
            }
        );
        res.status(201).json({
            success: true,
            data: newSubsection,
            message: 'Subsection created successfully.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const updateSubsection = async (req, res) => {
    try {
        const { subSectionId, title, description, timeDuration } = req.body;
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'Subsection id is required.'
            })
        }
        const updateSubsection = await SubsectionModel.findByIdAndUpdate({ _id: subSectionId },
            // { title, description, timeDuration }
            req.body, { new: true }
        );

        res.status(200).json({
            success: true,
            data: updateSubsection,
            message: 'Subsection updated successfully.'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const deleteSubsection = async (req, res) => {
    try {
        const { subSectionId } = req.body;
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'Subsection id is required.'
            })
        };
        const deleteSubsection = await SubsectionModel.findByIdAndDelete({
            _id: subSectionId
        });

        res.status(200).json({
            success: true,
            data: deleteSubsection,
            message: 'Subsection deleted successfully.'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {createSubsection, deleteSubsection, updateSubsection};