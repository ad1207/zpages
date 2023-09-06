import {checkEmailExists, insertUser} from '../../../../service/auth/auth.service'
import { NextRequest, NextResponse } from 'next/server'
import { setLoginSession } from '../../../../middleware/auth'
import { createCompany } from '../../../../service/company.service'
import { createRepo } from '../../../../service/repository.service'


export async function POST(request){
    try{
        const req = await request.json()
        const {name, email, password, sub_domain, origin} = req;
        let isEmailExists = await checkEmailExists(email)
        console.log('isEmailExists--->', isEmailExists);
        // if(isEmailExists!==null){
        //     return NextResponse.json({error: 'email taken',status: false})
        // }
        // else{
            const company = await createCompany({name, sub_domain});
            console.log('company--->', company);
            const data = await insertUser(name, email, password, origin, company.id)
            console.log('data--->', data);
            const repo = await createRepo({ repo_name: 'My Workspace', status: 'A', company_id: company.id, repo_type: "B", user_id: data.id });
            console.log('repo--->', repo);
            const response = NextResponse.json({
                user: { first_name: name, email, password },
                data: data,
                status: true,
            });
            await setLoginSession(response, data);
            return response;
        //}
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: error.message ,status: false},{status: 500})
    }

}