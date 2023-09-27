import { getTags } from "../../../../service/tag.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        const { tag } = ctx.params;
        let tag1 = tag[0].split(",");
        let bitag = tag1.map((t) => BigInt(t));
        console.log("bitag ----> ",bitag)
        const result = await getTags(bitag);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}