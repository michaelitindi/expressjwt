const cloudinary = require("cloudinary").v2;

function uploadToCloudinary(path, folder) {
    return cloudinary.v2.uploader.upload(path, {folder}).then((data) => {
        return{
            url: data.url,
            duration: data.duration
        };
    }). catch((error) =>{
        console.log(error)
    } )

}

module.exports = uploadToCloudinary;