import { checkDuplicateTitle, updateBlog } from "../../../service/blog.service";
import { deleteImage, getImages } from "../../../service/cloudinary.service";

export async function POST(request){
    try{
        const body = await request.json();
        if(body.operation === 'DELETE'){
            const data = await deleteImage(body.publicId);
            if(data.result === 'ok'){
                const result = await getImages(body.folder);
                return NextResponse.json(result, {status: 200});
            }
            else{
                return NextResponse.json("Delete Error", {status: 500});
            }
        }
        else{
            return NextResponse.json("Invalid Operation", {status: 401});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err.message, {status: 500});
    }
}

export async function PUT(request){
    try{
        const body = await request.json();
        const {
			id,
			title,
			description,
			author,
			blogDate,
			categories,
			tag,
			content,
			company_id,
			status,
			createdAt,
			thumbnail,
			is_author,
			is_publish_date,
		} = body;

        const errors = [];
		const isdata = await checkDuplicateTitle(title, company_id);

		if (isdata > 1) {
			errors.push('Duplicate entry');
			if (errors.length > 0) {
				//res.status(200).json({ errors });
				return NextResponse.json({errors}, {status: 200});
			}
		}
        const result = await updateBlog(
			id,
			title,
			description,
			author,
			blogDate,
			categories,
			tag,
			company_id,
			status,
			createdAt,
			thumbnail,
			content,
			is_author,
			is_publish_date
		);

        return NextResponse.json({ title: title, repo_id: result.repo_id, message: 'success' }, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err.message, {status: 500});
    }
}