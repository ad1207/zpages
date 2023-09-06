import { getDB } from "../db-config/db";
import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import { getBlogsByCategory } from "./blog.service";
import slugify from "slugify";

const { db } = getDB();

export const getAllCategories = async (company_id) => {
	let result = [];
	try {
		result = await prisma.category.findMany({
			where: {
				company_id: Number(company_id),
			},
			orderBy: {
				name: 'asc',
			},
		});
	} catch (error) {
		console.log('getAllCategories error::' + error.message);
	}

	return bigIntToString(result);
};

export const deleteCategory = async (company_id) => {
	let result = null;
	try {
		result = await prisma.category.delete({
			where: {
				id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('deleteCategory error::' + error.message);
	}
	return bigIntToString(result);
};

export const updateCategory = async (name, category_id, company_id) => {
	let slug = slugify(name).toLowerCase();
	let result = null;
	try {
		result = await prisma.category.update({
			where: {
				id: Number(category_id),
			},
			data: {
				name: name,
				slug: slug,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('updateCategory error::' + error.message);
	}
	return bigIntToString(result);
};

export const checkDuplicateNames = async (name, company_id) => {
	let result = null;
	try {
		result = await prisma.category.count({
			where: {
				name: name,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('checkDuplicateNames error::' + error.message);
	}
	return result;
};

export const getAllBlog = async () => {
	let result = null;
	try {
		result = await prisma.blog.findMany({});
	} catch (error) {
		console.log('getAllBlog error::' + error.message);
	}
	return bigIntToString(result);
};

export const getCategories = async (ids) => {
	// let query = `select * from category t where t.id in (${ids})`;

	// return new Promise(function (resolve) {
	// 	db.any(query, []).then((data) => {
	// 		resolve(data);
	// 	});
	// });

	let result = null;
	try {
		result = await prisma.category.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	} catch (error) {
		console.log('get category error :: ' + error.message);
	}
	return bigIntToString(result);
};

export const createCategory = async (name, company_id) => {
	let slug = slugify(name).toLowerCase();
	let result = null;
	try {
		result = await prisma.category.create({
			data: {
				name: name,
				slug: slug,
				company_id: Number(company_id),
			},
		});
	} catch (error) {
		console.log('createCategory error::' + error.message);
		throw new Error(`createCategory error ::  ${error.message}`);
	}
	return bigIntToString(result);
};

export const getCategoryWithTemplate = async () => {
	try {
		const result = await prisma.category.findMany({
			include: {
				template: true,
			},
		});

		let returnArr = result.filter((res) => {
			if (res.template.length > 0 && res != null) return res;
		});

		return bigIntToString(returnArr);
	} catch (error) {
		console.log('error in getCategoryWithTemplate', error.message);
	}
};

export const getCategoriesByCompany = async (company_id) => {
	let result = [];
	try {
		result = await prisma.category.findMany({
			where: {
				company_id: Number(company_id),
			},
			orderBy: {
				id: 'desc',
			},
		});
	} catch (error) {
		console.log('getAllCategories error::' + error.message);
	}

	return bigIntToString(result);
};

export const getlatestCategoryWithBlog = async (company_id) => {
	let result = [];
	try {
		let categories = await prisma.category.findMany({
			where: {
				company_id: Number(company_id),
			},
			orderBy: {
				updatedAt: 'desc',
			},
			// take: 6,
		});
		let blogs = null;
		let data = [];

		if (categories.length > 0) {
			await Promise.all(
				categories.map(async (cat, index) => {
					let blog = null;
					blog = await getBlogsByCategory(cat.id);
					if (blog != null) {
						let response = { blog: blog[0], category: cat };
						data.push(response);
					}
				})
			);
		}
		console.log('check data =====>', data);
		result = [...data];
	} catch (error) {
		console.log('getAllCategories error::' + error.message);
	}

	return bigIntToString(result);
};

export const getCategoriesByIds = async (ids) => {
	let result = [];
	try {
		result = await prisma.category.findMany({
			where: {
				id: {
					in: [...ids],
				},
			},
			select: {
				name: true,
			},
		});
	} catch (error) {
		console.log('getCategoriesByIds error::' + error.message);
	}

	return bigIntToString(result);
};

/**
 * Method for Category Pagination API
 * @param {JSON} body
 * @returns
 */
export const createPublishedCategoryByCompany = async (body) => {
	let result = null;
	let count = null;
	let tempData = null;
	try {
		const { company_id, page = 0, size = 10, sort = 'desc' } = body;
		let offset = page > 0 ? page * size : 0;

		if (company_id) {
			result = await prisma.category.findMany({
				skip: offset,
				take: size,
				where: {
					company_id: Number(company_id),
				},
				orderBy: {
					createdAt: sort,
				},
			});

			count = await prisma.category.count({
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
		console.log('createPublishedCategoryByCompany error::' + error.message);
	}
	return bigIntToString(tempData);
};
