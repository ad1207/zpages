import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import slugify from "slugify";

export const getAllTags = async (company_id) => {
	let result = [];
	try {
		result = await prisma.tag.findMany({
			where: {
				company_id: Number(company_id),
			},
			orderBy: {
				name: 'asc',
			},
		});
	} catch (error) {
		console.log('getAllTags error :: ' + error.message);
	}
	
	return bigIntToString(result);
};

export const deleteTag = async (company_id) => {
	let result = null;
	try {
		result = await prisma.tag.delete({
			where: {
				id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('deleteTag error :: ' + error.message);
	}
	return bigIntToString(result);
};

export const updateTag = async (name, tag_id, company_id) => {
	let slug = slugify(name).toLowerCase();
	let result = null;
	try {
		result = await prisma.tag.update({
			where: {
				id: Number(tag_id),
			},
			data: {
				name: name,
				slug: slug,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('updateTag error :: ' + error.message);
	}
	return bigIntToString(result);
};

export const checkDuplicateNames = async (name, company_id) => {
	let result = null;
	try {
		result = await prisma.tag.count({
			where: {
				name: name,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('checkDuplicateNames error :: ' + error.message);
	}
	return result;
};

export const getAllBlog = async () => {
	let result = null;
	try {
		result = await prisma.blog.findMany({});
	} catch (error) {
		console.log('getAllBlog error :: ' + error.message);
	}
	return bigIntToString(result);
};

export const getTags = async (ids) => {
	// let query = `select * from tag t where t.id in (${ids})`;

	// return new Promise(function (resolve) {
	// 	db.any(query, []).then((data) => {
	// 		resolve(data);
	// 	});
	// });
	let result = null;
	try {
		result = await prisma.tag.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	} catch (error) {
		console.log('get tag error :: ' + error.message);
		throw new Error(`Get Tag Error: ${error.message}`);
	}
	return bigIntToString(result);
};

/**
 * Method for Tag Pagination API
 * @param {JSON} body
 * @returns
 */
export const createPublishedTagByCompany = async (body) => {
	let result = null;
	let count = null;
	let tempData = null;
	try {
		const { company_id, page = 0, size = 10, sort = 'desc' } = body;
		let offset = page > 0 ? page * size : 0;

		if (company_id) {
			result = await prisma.tag.findMany({
				skip: offset,
				take: size,
				where: {
					company_id: Number(company_id),
				},
				orderBy: {
					createdAt: sort,
				},
			});

			count = await prisma.tag.count({
				where: {
					company_id: Number(company_id),
				},
			});

			let length = count;
			let totalPages = length < size ? 1 : Math.ceil(length / size);
			tempData = {
				totalCount: length,
				totalPage: totalPages,
				size: size,
				content: result,
			};
		} else {
			return (result = { message: 'company_id is required' });
		}
	} catch (error) {
		console.log('createPublishedTagByCompany error::' + error.message);
	}
	return bigIntToString(tempData);
};

export const createTag = async (name, company_id) => {
	let slug = slugify(name).toLowerCase();
	let result = null;
	try {
		result = await prisma.tag.create({
			data: {
				name: name,
				slug: slug,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('createTag error :: ' + error.message);
		throw new Error(`createTag error ::  ${error.message}`);
	}
	console.log(result)
	return bigIntToString(result);
};
