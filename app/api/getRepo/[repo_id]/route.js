import { getRepo } from "../../../../service/repository.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        const { repo_id } = ctx.params;
        const result = await getRepo(repo_id);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}
