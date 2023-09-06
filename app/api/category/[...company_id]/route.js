import { as } from 'pg-promise'
import {getAllCategories, deleteCategory, getCategoryWithTemplate, createPublishedCategoryByCompany} from '../../../../service/category.service'
import { NextResponse } from 'next/server';

export async function GET(request,ctx){
    try{
        const {company_id} = ctx.params;
        if(company_id[0]==='getCatWithTemp'){
            const result = await getCategoryWithTemplate();
            return NextResponse.json(result, {status: 200});
        }
        else{
            const result = await getAllCategories(company_id[0]);
            return NextResponse.json(result, {status: 200});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function DELETE(request,ctx){
    try{
        const {company_id} = ctx.params;
        const result = await deleteCategory(company_id);
        return NextResponse.json({result:'success', company_id:result?.company_id}, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function POST(request,ctx){
    try{
        const {company_id} = ctx.params;
        const body = await request.json();
        if(company_id[0]==='categoryPage'){
            const result = await createPublishedCategoryByCompany(body);
            return NextResponse.json(result, {status: 200});
        }
        else{
            
            return NextResponse.json("Page not found", {status: 400});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}