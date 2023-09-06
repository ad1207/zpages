import e from "cors";
import { auth } from "../../../../middleware/auth";
import {getAllTags, deleteTag, createPublishedTagByCompany} from '../../../../service/tag.service';
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        request.params = ctx.params;
        console.log("request.params",request.params)
        await auth(request);
        const company_id = request.params.company_id;
        const result = await getAllTags(company_id);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 401});
    }
}

export async function DELETE(request, ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const company_id = request.params.company_id;
        const result = await deleteTag(company_id);
        if(result){
            return NextResponse.json({result:"success"}, {status: 200});
        }
        else{
            return NextResponse.json("Delete Error", {status: 500});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err.message, {status: 500});
    }
}

export async function POST(request, ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const company_id = request.params.company_id;
        const body = await request.json();
        if(company_id[0] === "tagPage"){
            const result = await createPublishedTagByCompany(body);
            return NextResponse.json(result, {status: 200});
        }
        else{
            return NextResponse.json([], {status: 401});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err.message, {status: 500});
    }
}