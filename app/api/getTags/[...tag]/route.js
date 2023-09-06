import { getTags } from "../../../../service/tag.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        const { tag } = ctx.params;
        let bitag = tag.map((t) => BigInt(t));
        const result = await getTags(bitag);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}