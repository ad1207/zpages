import jwt from 'jsonwebtoken';
import { auth } from '../../../../middleware/auth';
import { getUserById } from '../../../../service/auth/auth.service';
import { NextResponse } from 'next/server';

export async function GET(request,ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const user = await getUserById(request.user.id);
        return NextResponse.json({user: user}, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}