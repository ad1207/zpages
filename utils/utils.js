import { uploadToCloudinary } from "../service/cloudinary.service";

export const cloudinaryUpload = async (file, folderPath = null) => {
    try{
        var locaFilePath = file.path;
        var metaData = await uploadToCloudinary(locaFilePath, folderPath);
        return metaData;
    }
    catch(err){
        console.log(err)
    }
};