import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        
        if (!filePath) return null;

        const result = await cloudinary.uploader.upload(filePath);

        fs.unlinkSync(filePath);   // Delete local file after successful upload

        return result.secure_url;
    }
    catch (error) {
        if (filePath) {
            fs.unlinkSync(filePath); // Delete local file even if upload fails
        }

        console.log(error);
        return null;
    }
};

export default uploadOnCloudinary;