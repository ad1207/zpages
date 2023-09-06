import { ca } from "date-fns/locale";
import { auth, setLoginSession } from "../../../../middleware/auth";
import { getVerifiedAuthor, passwordReset, getAllAuthor } from "../../../../service/auth/subUser.service";
import { NextResponse } from "next/server";

export async function GET(request, ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const company_id = request.user.company_id;
        const { slug } = ctx.params;
        if (slug[0] === 'company') {
			const result = await getVerifiedAuthor(company_id);
			//res.status(200).json(result);
            return NextResponse.json(result, {status: 200});
		} else if (slug[0] === 'getAll') {
			const result = await getAllAuthor(company_id);
			//res.status(200).json(result);
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

export async function POST(request, ctx) {
    try{
        const body = await request.json();
        const { slug } = ctx.params;
        if(slug[0] === 'signup'){
            const result = await passwordReset(body);
			let obj = {
				id: result.id,
				company_id: result.company_id,
				role: 1,
			};
            const response = NextResponse.json(result, {status: 200});
			await setLoginSession(response, obj);
            return response;
        }
        else{
            return NextResponse.json([], {status: 401});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 500});
    }
}