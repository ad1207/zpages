import { NextResponse } from 'next/server';
import {auth} from '../../../middleware/auth';
import { checkDuplicateNames, createCategory, getAllCategories, updateCategory} from '../../../service/category.service'
import { ca } from 'date-fns/locale';

export async function GET(request){
    try{
        await auth(request);
        const company_id = request.user.company_id;
        const categories = await getAllCategories(company_id);
        return NextResponse.json({categories, company_id}, {status: 200});
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function POST(request){
    try{
        const body = await request.json();
        const {name, company_id} = body;
        const errors = [];
		const isdata = await checkDuplicateNames(name, company_id);
		if (isdata > 0) {
			errors.push('Duplicate entry');
            if (errors.length > 0) {
				return NextResponse.json({errors}, {status: 200});
			}
		}
		const result = await createCategory(name, company_id);
        return NextResponse.json(result, {status: 200});
    }catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}

export async function PUT(request){
    try{
        const body = await request.json();
        const {name, categoryid, company_id} = body;
        const errors = [];
        const isdata = await checkDuplicateNames(name, company_id);

			if (isdata > 1) {
				errors.push('Duplicate entry');
				if (errors.length > 0) {
					// res.status(200).json({ errors });
					return NextResponse.json({errors}, {status: 200});
				}
			}

			const result = await updateCategory(name, categoryid, company_id);
            return NextResponse.json({result:'success'}, {status: 200});
			//res.status(200).send({ result: 'success' });
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json(err, {status: 500});
    }
}