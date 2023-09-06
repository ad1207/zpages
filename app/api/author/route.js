import {insertSubUser} from '../../../service/auth/subUser.service'
import mail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import { auth } from '../../../middleware/auth';
import { NextResponse } from 'next/server';

mail.setApiKey(process.env.NEXT_PUBLIC_SG_SECRET_KEY);

const sendMail = async (body) => {
	const { name, email } = body;
	const link = await generateLink(body);
	const msg = {
		to: email,
		from: 'sender@squapl.com',
		subject: 'Signup Test',
		text: 'Test',
		html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><p><span><strong>Hi ${name},</strong></span><br><br>
        Click the link to signup<br><br>
        <p>${link}</p><br><br>
        <span><strong>Thanks,</strong></span></p></body></html>`,
	};
	const data = await mail.send(msg).then(() => {
		if (error) {
			console.log(error);
			return { status: 'Error' };
		} else {
			console.log("That's wassup!");
			return { status: 'Ok' };
		}
	});

	//   await mail.send(msg,(error, result) => {
	//     if (error) {
	//         console.log(error);
	//     } else {
	//         console.log("That's wassup!");
	//     }
	//   });
	//<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><p><span><strong>Hi ${name},</strong></span><br><br>
	// <span><a href=${link}>Click</a></span>Click the link to signup<br><br>
	// <p>${link}</p><br><br>
	// <span><strong>Thanks,</strong></span></p></body></html>
	// }
	return data;
};

const generateLink = async (body) => {
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const payload = {
		id: body.id,
		user_id: body.userId,
		email: body.email,
	};

	const token = jwt.sign(payload, secret, { expiresIn: '1d' });
	const link = `${process.env.CLIENT_URL}/author-signup/${body.userId}/${token}`;
	return link;
};

export async function POST(request){
	try{
		await auth(request);
		let user = request.user;
		let body = await request.json();
		const {name,email,accessRights} = body;
		const result = await insertSubUser({name,email,company_id:user.company_id,accessRights});
		if(result.message==='success'){
			body['userId'] = result.userId;
			body['id'] = result.id;
			const email = await sendMail(body);
			console.log("email ----> ",email);
			return NextResponse.json(result, {status: 200});
		}
		else{
			return NextResponse.json([], {status: 401});
		}
	}
	catch(err){
		console.log("error ----> ",err)
		return NextResponse.json(err, {status: 500});
	}
}