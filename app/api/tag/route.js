import {auth} from '../../../middleware/auth';
import {createTag, getAllTags, updateTag, checkDuplicateNames} from '../../../service/tag.service';
import { NextResponse } from 'next/server';

export async function GET(request,ctx){
    try{
        request.params = ctx.params;
        await auth(request);
        const company_id = request.user.company_id;
        const tags = await getAllTags(company_id);
        return NextResponse.json({company_id,tags}, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function POST(request,ctx){
    try{
        const body = await request.json();
        const {name, company_id} = body;
        let errors = []
        const isData = await checkDuplicateNames(name, company_id);
        if(isData > 0){
            errors.push("Duplicate entry")
            if(errors.length > 0){
                return NextResponse.json(errors, {status: 200});
            }
        }
        const result = await createTag(name, company_id);
        return NextResponse.json(result, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function PUT(request,ctx){
    try{
        const body = await request.json();
        const {name, company_id, tag_id} = body;
        let errors = []
        const isData = await checkDuplicateNames(name, company_id);
        if(isData > 1){
            errors.push("Duplicate entry")
            if(errors.length > 0){
                return NextResponse.json(errors, {status: 200});
            }
        }
        const result = await updateTag(name, tag_id, company_id);
        return NextResponse.json({result:'success'}, {status: 200});
    }catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}