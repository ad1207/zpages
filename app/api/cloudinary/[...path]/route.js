import multer from "multer";
import { uploadToCloudinary } from "../../../../service/cloudinary.service";
const cloudinary = require("cloudinary").v2;
import { NextResponse } from "next/server";

// export function generateSignature(req: NextApiRequest, res: NextApiResponse) {
// 	const timestamp = Math.round(new Date().getTime() / 1000);
// 	let path = `${req.query.path[0]}/${req.query.path[1]}/`;
// 	const signature = cloudinary.utils.api_sign_request(
// 		{
// 			folder: path,
// 			timestamp: timestamp,
// 		},
// 		process.env.CLOUDINARY_SECRET,
// 	);

// 	res.statusCode = 200;
// 	res.json({ signature, timestamp });
// }

const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads',
		filename: (req, file, cb) => cb(null, file.originalname),
	}),
});

export const deleteImageByFolder = async (folder) => {
	cloudinary.config({
		cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // add your cloud_name
		api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY, // add your api_key
		api_secret: process.env.CLOUDINARY_SECRET, // add your api_secret
		secure: true,
	});
	const data = await cloudinary.api.delete_resources_by_prefix(folder, function (result) {
		return result;
	});
	return data;
};

export async function POST(request) {
    try{
        
        const formData = await request.formData()
        const folder = formData.get('folder')
        const files = formData.get('file')
        const filepath = formData.get('filepath')
        console.log("files----> ",files)
        console.log("folder----> ",folder)
        let cloudinaryResponse = await uploadToCloudinary(files, folder);
        console.log("cloudinaryResponse in route ----> ",cloudinaryResponse)
        return NextResponse.json(cloudinaryResponse, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 500});
    }
}

export async function GET(request,ctx){
    try{
        const timestamp = Math.round(new Date().getTime() / 1000);
        let path = `${ctx.params.path[0]}/${ctx.params.path[1]}/`;
        const signature = cloudinary.utils.api_sign_request(
            {
                folder: path,
                timestamp: timestamp,
            },
            process.env.CLOUDINARY_SECRET,
        );
        return NextResponse.json({ signature, timestamp }, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 500});
    }
}

export async function DELETE(request,ctx){
    try{
        const data = await deleteImageByFolder(`${ctx.params.path[0]}/`);
        return NextResponse.json(data, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 500});
    }
}