import { getImages } from "../../../../service/cloudinary.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        const { path } = ctx.params;
        let newPath = path.join("/");
        console.log("newPath----> ",newPath)
        const result = await getImages(newPath+'/');
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error in get Images----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}