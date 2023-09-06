import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // add your cloud_name
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY, // add your api_key
	api_secret: process.env.CLOUDINARY_SECRET, // add your api_secret
	secure: true,
});

export const getImages = async (path) => {
	const data = await cloudinary.search
		.expression(
			`folder:${path}/*`,
		)
		.sort_by('public_id', 'desc')
		.max_results(20)
		.execute()
		.then((result) => {
			return result.resources;
		});
	return data;
};

export const deleteImage = async (public_id) => {
	const data = cloudinary.uploader.destroy(public_id, function (result) {
		return result;
	});
	return data;
};



const publicIdIteration = (public_id) => {
	let store = '';
	let data=public_id.split('-')
	for (var i = 0; i < data.length; i++) {
		// store += public_id.charAt(i).replace('-', '/');
		store+=data[i]+'/'
	}
	return store;
}

// const deleteImage = async (public_id,replace=false) => {
//   let publicId= replace ? public_id.replaceAll('-','/') : public_id
// // 	let publicId=publicIdIteration(public_id);
// 	const data =  cloudinary.uploader.destroy(publicId, function (result) {
// 		return result;
// 	});
// 	return data;
// };

/**
 * Method to delete cloudinary video
 * @param {String} public_id 
 * @returns 
 */
const deleteVideo = async (public_id) => {
	let publicId=public_id.replaceAll('-','/')
	let resource_type= 'video'
	const data = cloudinary.uploader.destroy(publicId,{resource_type}, function (result) {
		return result;
	});
	return data;
};

/**
 * Method to upload file in cloudinary
 * @param {String} locaFilePath 
 * @param {String} folderPath 
 * @returns cloudinary response
 */
export async function uploadToCloudinary(file,folderPath) {
	var mainFolderName = folderPath === null ?'profiles' :folderPath;
	// var fileName = locaFilePath.split('\\')[2];
	// return cloudinary.uploader
	// 	.upload(locaFilePath, { folder: mainFolderName, resource_type: "auto" })
	// 	.then(async(result) => {
	// 		// let data=await cloudinaryFilter(result)
	// 		fs.unlinkSync(locaFilePath);
	// 		return {
	// 			message: "Success",
	// 			...result
	// 		};
	// 	})
	// 	.catch((error) => {
	// 		// Remove file from local uploads folder
	// 		fs.unlinkSync(locaFilePath);
	// 		return { message: "Fail" };
	// 	});
	const formData = new FormData();
	formData.append('file',file)
	formData.append('folder',mainFolderName)
	formData.append('upload_preset',process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
	const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
	const result = await axios.post(cloudinaryUrl, formData);
	console.log("result in uploadToCloudinary ----> ",result);
	return result.data;
}

/**
 * This function use to filter valid fields
 * @param {} request_data 
 * @returns 
 */
const cloudinaryFilter = async (request_data) => {
    try {
        const { public_id, resource_type, url, original_filename } = request_data
        let result = {
            public_id,
            resource_type,
            url,
            original_filename
        }
        return result;
    } catch (error) {
        console.log("Error occurred in cloudinaryFilter: ", error);
        throw error;
    }
}

