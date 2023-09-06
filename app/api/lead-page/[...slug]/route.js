import {
    getLeadPageByRepo,
    updateBlock,
    deleteById,
    publishLead,
    updateViewCount,
    createPublishedLeadsByCompany,
  } from '../../../../service/lead-page.service';

import { auth } from '../../../../middleware/auth';
import { NextResponse } from 'next/server';

export async function GET(request, ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const { slug } = ctx.params;
        if (slug[0] === "getById") {
            const result = await getCollection(slug[1]);
            //res.status(200).json(result);
            return NextResponse.json(result, {status: 200});
          } else if (slug[0] === "getAll") {
            const result = await getAllLeadPages();
            // res.status(200).json(result);
            return NextResponse.json(result, {status: 200});
          } else if (slug[0] === "repo") {
            const result = await getLeadPageByRepo(slug[1]);
            // res.status(200).json(result);
            return NextResponse.json(result, {status: 200});
          }
          else{
            return NextResponse.json([], {status: 401});
          }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 401});
    }
}
    
