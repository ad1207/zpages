import { getDB } from "../../db-config/db";
import crypto from 'crypto';
import prisma from "../../db-config/prisma";
import { bigIntToString } from "../../db-config/utils";
import { nanoid } from 'nanoid';

const {db} = getDB();

export const insertSubUser = async (data) => {
	const { name, email, company_id, accessRights } = data;
	let username = nanoid(11);

	let profile = `${process.env.CLIENT_URL}/profile/${username}`;
	let status = `U`;

	const user = await prisma.users.create({
		data: {
			first_name: name,
			email: email,
			status: status,
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
	const returnValue = bigIntToString(user);

	let returnObj = {
		message: 'success',
		id: returnValue.id,
		userId: returnValue.user_id,
		role: returnValue.user_role[0].role_id,
		company_id: returnValue.company_id,
	};

	return returnObj;
};

export const getVerifiedAuthor = async (company_id) => {
	let status = `U`;

	let authors = null;
	try {
		authors = await prisma.users.findMany({
			where: {
				AND: [{ company_id: { equals: Number(company_id) || undefined } }, { status: { equals: 'A' || 'I' } }],
			},
			select: {
				id: true,
				first_name: true,
				email: true,
				status: true,
				access_rights: true,
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}

	return bigIntToString(authors);
};

export const getAllAuthor = async (company_id) => {
	let status = `U`;
	let authors = null;
	try {
		authors = await prisma.users.findMany({
			where: {
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('prisma error::' + error.message);
	}
	return bigIntToString(authors);
};

export const passwordReset = async (body) => {
	const { password, id } = body;
	const salt1 = crypto.randomBytes(16).toString('hex');
	let status = 'A';
	const hash = crypto.pbkdf2Sync(password, salt1, 1000, 64, 'sha512').toString('hex');
	let user = null;
	try {
		user = await prisma.users.update({
			where: {
				id: Number(id),
			},
			data: {
				status: status,
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