const cloudinary = require("cloudinary") 

const createCloudinaryConfig = () => {
    const cloud = cloudinary.v2
    return cloud.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

const uploadImage = async filePath =>
    await createCloudinaryConfig().uploader.upload(filePath, err => {
        throw new Error(err.message)
    })

const deleteImage = async publicId =>
    await createCloudinaryConfig().uploader.destroy(publicId, err => {
        throw new Error(err.message)
    })

module.exports = {
    uploadImage,
    deleteImage,
}