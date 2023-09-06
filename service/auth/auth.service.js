import crypto from 'crypto';
import { nanoid } from 'nanoid';
import prisma from "../../db-config/prisma";
import { bigIntToString} from "../../db-config/utils";

export const checkEmailExists = async (email) => {
	let users = null;
	try {
		users = await prisma.users.findUnique({
			where: {
				email: email,
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	return bigIntToString(users);
};

export const checkIdExists = async (id) => {
	let users = null;
	try {
		users = await prisma.users.findMany({
			where: {
				id: Number(id),
			},
			include: {
				user_role: {
					include: {
						role: true,
					},
				},
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	const returnValue = bigIntToString(users);
	returnValue[0]['role_name'] = returnValue[0].user_role[0].role.name;
	returnValue[0]['role_desc'] = returnValue[0].user_role[0].role.description;
	returnValue[0]['role'] = returnValue[0].user_role[0].role_id;
	returnValue[0].user_role = '';

	return returnValue[0];
};

export const insertUser = async (name, email, password, origin, company_id) => {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	let username = nanoid(11);

	let accessRights = 'A';

	let profile = `${process.env.CLIENT_URL}/profile/${username}`;
	let status = `A`;

	let user = null;
	try {
		user = await prisma.users.create({
			data: {
				first_name: name,
				email: email,
				status: status,
				salt: salt,
				hashed_password: hash,
				profile_url: profile,
				company_id: Number(company_id),
				access_rights: accessRights,
				user_id: nanoid(11),
				user_role: {
					create: [{ role_id: 1 }],
				},
			},
			include: {
				user_role: true, // users all user_role in the returned object
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	const returnValue = bigIntToString(user);

	let returnObj = {
		message: 'success',
		id: returnValue.id,
		role: returnValue.user_role[0].role_id,
		company_id: returnValue.company_id,
	};

	return returnObj;
};

export const getUser = async ({ email }) => {
	let user = null;
	try {
		user = await prisma.users.findMany({
			where: {
				email: email,
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	const returnValue = bigIntToString(user);
	console.log('test author singup--->', returnValue);
	return returnValue[0];
};

export const getUserByEmail = async (email) => {
	let users = null;
	try {
		users = await prisma.users.findFirst({
			where: {
			  email: email,
			},
			include: {
			  user_role: 
			  {
				include: {
				  role: true,
				},
			  },
			},
		  });
		console.log('users--->', users);
	} catch (error) {
		console.log('prisma error::' + error);
	}
	const returnValue = bigIntToString(users);
	console.log('test author singup--->', returnValue);
	if (!returnValue) {
		console.log('exit')
		return null;
	} else {
		returnValue['role_name'] = returnValue.user_role[0].role.name;
		returnValue['role_desc'] = returnValue.user_role[0].role.description;
		returnValue['role'] = returnValue.user_role[0].role_id;
		returnValue.user_role = '';
	}
	console.log('test author singup--->', returnValue);
	return returnValue;
};

export const getUserById = async (id) => {
	let user = null;
	try {
		user = await prisma.users.findUnique({
			where: {
				id: Number(id),
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	return bigIntToString(user);
};

export const getUserByNano = async (id) => {
	let user = null;
	try {
		const user = await prisma.users.findMany({
			where: {
				user_id: id,
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	const returnValue = bigIntToString(user);
	console.log('test author singup--->', returnValue);
	return returnValue[0];
};
