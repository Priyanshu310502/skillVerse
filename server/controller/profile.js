const ProfileModel = require('../model/Profiles.js');
const UserModel = require('../model/user');

const updateProfile = async (req, res) => {
    try {
        const { dob = "", gender, contactNumber, about = "" } = req.body;
        const id = req.user.id;
        const userDetails = await UserModel.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await ProfileModel.findById(profileId);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                error: 'Profile not found'
            });
        }
        const updateProfile = await ProfileModel.findByIdAndUpdate(profileId, {
            dob,
            gender,
            contactNumber,
            about
        }, { new: true })
        // profileDetails.dob = dob;
        // profileDetails.gender = gender;
        // profileDetails.contactNumber = contactNumber;
        // profileDetails.about = about;

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updateProfile
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await UserModel.findById(id);
        console.log(userDetails);
        const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const deletedProfile = await ProfileModel.findByIdAndDelete({ _id: userDetails.additionalDetails });
        if (!deletedProfile) {
            return res.status(404).json({
                success: false,
                error: 'Profile not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Profile deleted successfully',
            data: deletedProfile
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
}
const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await UserModel.findById(id)
            .populate('additionalDetails')
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                error: 'data not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: userDetails
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
}
module.exports = { updateProfile, getProfile, deleteProfile }