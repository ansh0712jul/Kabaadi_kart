import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
    
const uploadOnCloudinary = async (localFilePath : string) => {
    
    try {
        if(!localFilePath) {
            throw new ApiError(400 , "local File path is required")
        }

        // upload file on cloudinary
        const uploadReasponse = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto"
        });
        // file has been uploaded succesfully
        console.log("file has been uploaded to cloudinary" , uploadReasponse.url);
        return uploadReasponse;

    } catch (error : any) {
        console.error("cloudinary upload error" , error);
        throw new ApiError(501 , error.message);
        
    }
    finally{
        fs.unlinkSync(localFilePath) // remove the locally saved temporary files 
    }
} 