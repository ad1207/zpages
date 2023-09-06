import { getCategories } from "../../../../service/category.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        const { category } = ctx.params;
        const result = await getCategories(category);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}