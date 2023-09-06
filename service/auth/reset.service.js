import { getDB } from "../../db-config/db"
import crypto from 'crypto';
import prisma from "../../db-config/prisma";
import { bigIntToString } from "../../db-config/utils";
const {db} = getDB();

export const passwordReset = async (password, id) => {
	const salt1 = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt1, 1000, 64, 'sha512').toString('hex');
	let user = null;
	try {
		user = await prisma.users.update({
			where: {
				id: Number(id),
			},
			data: {
				salt: salt1,
				hashed_password: hash,
			},
			select: {
				id: true,
				company_id: true,
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	const returnValue = bigIntToString(user);
	return { message: 'success', id: returnValue.id, company_id: returnValue.company_id };
};