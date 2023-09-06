import { getDB } from "../db-config/db";
import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import { nanoid } from "nanoid";

export const createRepo = async ({ repo_name, status, company_id, repo_type, user_id }) => {
	let result = null;

	try {
		result = await prisma.repo.create({
			data: {
				repo_id: nanoid(11),
				repo_name: repo_name,
				company_id: Number(company_id),
				status: status,
				is_delete: 'N',
				created_by: Number(user_id),
				createdAt: new Date(),
				repo_type: repo_type,
			},
		});
	} catch (error) {
		console.log('test createRepo--->', error.message);
	}

	return bigIntToString(result);
};

export const updateRepo = async (data) => {
	const { name, status, id } = data;

	let result = null;
	try {
		result = await prisma.repo.update({
			where: {
				id: Number(id),
			},
			data: {
				name: name,

				status: status,
				updated_date: new Date(),
			},
		});
	} catch (error) {
		console.log('test updateRepo--->', error.message);
	}

	return bigIntToString(result);
};

export const deleteRepo = async (id) => {
	const query1 = prisma.repo.update({
		where: {
			id: Number(id),
		},
		data: {
			is_delete: 'Y',
		},
	});

	const query2 = prisma.blog.updateMany({
		where: {
			repo_id: Number(id),
		},
		data: {
			status: 'H',
			published: 'S',
		},
	});
	const query3 = prisma.lead_page.updateMany({
		where: {
			repo_id: Number(id),
		},
		data: {
			status: 'H',
		},
	});

	const [deleteRepo, upadateBlog, updateCTemp] = await prisma.$transaction([query1, query2, query3]);

	return bigIntToString(deleteRepo);
};

// async function deleteRepo(id) {
// 	await deleteRepoRow(id);
// }

// deleteRepo(id)
// 	.catch(console.error.message)
// 	.finally(() => {
// 		prisma.$disconnect();
// 	});

export const getRepos = async (company_id) => {
	let result = null;
	try {
		result = await prisma.repo.findMany({
			where: {
				AND: [
					{ company_id: { equals: Number(company_id) || undefined } },
					{ is_delete: { equals: 'N' || undefined } },
				],
			},
			orderBy: {
				repo_name: 'asc',
			},
			include: {
				company: true,
			},
		});
		return result;
	} catch (error) {
		console.log('getRepos error::' + error.message);
	}

	return bigIntToString(result);
};

export const checkDuplicateRepoName = async (repo_name, company_id) => {
	let result = null;
	try {
		result = await prisma.repo.count({
			where: {
				repo_name: repo_name,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('checkDuplicateRepoName error::' + error.message);
	}
	return result;
};

export const getRepo = async (id) => {
	let result = null;
	try {
		result = await prisma.repo.findUnique({
			where: {
				id: Number(id),
			},
		});
	} catch (error) {
		console.log('getRepo error::' + error.message);
	}
	return bigIntToString(result);
};

export const getRepoByNano = async (id) => {
	let result = null;
	try {
		result = await prisma.repo.findUnique({
			where: {
				repo_id: id,
			},
		});
	} catch (error) {
		console.log('getRepoByNano error::' + error.message);
	}
	return bigIntToString(result);
};
