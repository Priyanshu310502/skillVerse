const cloudinary = require('cloudinary').v2;

// Initialize Cloudinary with your own Cloudinary credentials

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: "drx1vkjbx",
            api_key: "495345374874365",
            api_secret: "8a10Wg92KyqscVs4LJPYR8kTG8k",
        });
    } catch (error) {
        console.log(error)
    }

}


// Function to upload a video to Cloudinary

const uploadToCloudinary = async (file, folder) => {
    const options = {
        folder,
        public_id: `uploaded_data/${folder}/${Date.now()}`,
        resource_type: 'auto',
        // width: 480,
        // height: 360,
        crop: 'fill'
    };
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;

}
module.exports = {uploadToCloudinary,cloudinaryConnect};