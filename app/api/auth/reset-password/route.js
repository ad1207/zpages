import { ca } from "date-fns/locale";
import { passwordReset } from "../../../../service/auth/reset.service";

export async function POST(request) {
    try{
        const req = await request.json();
        const {password, id} = req;
        const result = await passwordReset(password, id);
        return NextResponse.json(result, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}