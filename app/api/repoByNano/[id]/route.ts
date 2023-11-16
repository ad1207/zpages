import { NextResponse } from "next/server";
import { getRepoByNano } from '../../../../service/repository.service'

export async function GET(request, ctx) {
    try{
        const { id } = ctx.params;
        const result = await getRepoByNano(id);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}