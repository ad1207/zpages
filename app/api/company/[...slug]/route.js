import { getById, getByNano, deleteById, updateBlogFormat, getByNanoWithAssociation, getBySubDomain } from "../../../../service/company.service";
import { NextResponse } from "next/server";
import { auth } from "../../../../middleware/auth";
export async function GET(request, ctx) {
    try{
        request.params = ctx.params
        await auth(request)
        const company_id = request.user.company_id;
        const { slug } = request.params;
        if (slug[0] === 'getById') {
			const result = await getById(company_id);
			// res.status(200).json(result);
            return NextResponse.json(result, { status: 200 });
		} else if (slug[0] === 'getByNano') {
			const result = await getByNano(slug[1]);
			// res.status(200).json(result);
            return NextResponse.json(result, { status: 200 });
		} else if (slug[0] === 'getByNanoWithAssociation') {
			const result = await getByNanoWithAssociation(slug[1]);
			// res.status(200).json(result);
            return NextResponse.json(result, { status: 200 });
		} else if (slug[0] === 'getBySubDomain') {
			const result = await getBySubDomain(slug[1]);
			// res.status(200).json(result);
            return NextResponse.json(result, { status: 200 });
		}
        else{
            return NextResponse.json([], {status: 401});
        }
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}

export async function DELETE(request, ctx) {
    try{
        const { slug } = ctx.params;
        const result = await deleteById(slug[0]);
        return NextResponse.json(result, {status: 200})
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}

export async function PUT(request, ctx) {
    try{
        const body = await request.json()
        const { slug } = ctx.params;
        if (slug[0] === 'updateBlogFormat') {
            const {id, blogFormat} = body;
            const result = await updateBlogFormat(id, blogFormat);
            return NextResponse.json(result, {status: 200})
        }
        else{
            return NextResponse.json([], {status: 401});
        }
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}
