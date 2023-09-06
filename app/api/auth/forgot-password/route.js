import { getUserByEmail } from "../../../../service/auth/auth.service";
import jwt from "jsonwebtoken";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.NEXT_PUBLIC_SG_SECRET_KEY);

export async function POST(request) {
    try{
        const req = await request.json();
        const {email} = req;
        const user = await getUserByEmail(email);
        if(user==null) return NextResponse.json({email: email, message:'User not found', isError: true}, {status: 200});
        else{
            //  await mail.send({
            //     from: 'sanmuganathan.yuvaraj@aalamsoft.com',
            //     to: 'sanmugamsanjai98@gmail.com',
            //     subject: 'Test MSG',
            //     text: 'Test message'
            //   }).then(() => {
            //     return NextResponse.json({status: 'Ok'}, {status: 200});
            //   });
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const payload = {
                id: user.id,
                salt: user.salt,
                email: user.email,
            };

            const token = jwt.sign(payload, secret, { expiresIn: '10m' });
            const link = `${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`;
            return NextResponse.json({link: link, email:email, isError: false}, {status: 200});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({error: err.message, isError: true}, {status: 500});
    }
}