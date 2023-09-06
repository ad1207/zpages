import { nanoid } from "nanoid";
import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";

export const create = async (body) => {
	var resp = null;
	try {
		const { name, blocks, tempGroupList, category } = body;
		console.log('test data process---->', body);
		let status = `A`;
		let is_delete = `N`;
		let date = new Date();
		let type = 'B';
		let thumb = 'https://res.cloudinary.com/sanjayaalam/image/upload/v1633349662/C1/B1/gieglefcwr3iu1xzjkoo.png';

		const result = await prisma.template.create({
			data: {
				template_name: name,
				status: status,
				template_id: nanoid(11),
				is_delete: is_delete,
				blocks: blocks,
				createdAt: date,
				template_type: type,
				thumbnail: thumb,
				template_collection: {
					create: tempGroupList,
				},
			},
		});
		resp = bigIntToString(result);
	} catch (error) {
		console.log('test template.service create :: error', error.message);
	}
	return resp;
};

export const updateTemplateById = async (updateBody) => {
	var resp = null;
	try {
		const { id, name, blocks, status, tempGroupList } = updateBody;
		let date = new Date();
		let type = 'B';

		if (tempGroupList.length > 0) {
			await prisma.template_collection.deleteMany({
				where: {
					template_id: BigInt(id),
				},
			});
		}

		const result = await prisma.template.update({
			where: {
				id: id,
			},
			data: {
				template_name: name,
				status: status,
				blocks: blocks,
				updatedAt: date,
				template_type: type,
				template_collection: {
					create: tempGroupList.length > 0 ? tempGroupList : [],
				},
			},
		});
		resp = bigIntToString(result);
	} catch (error) {
		console.log('test template.service updateTemplateById :: error', error.message);
	}
	return resp;
};

export const getById = async (id) => {
	var resp = null;
	try {
		const result = await prisma.template.findMany({
			where: {
				AND: [
					{
						id: {
							equals: BigInt(id),
						},
					},
					{
						is_delete: {
							equals: 'N',
						},
					},
				],
			},
		});
		resp = bigIntToString(result.length > 0 ? result[0] : null);
	} catch (error) {
		console.log('test template.service getById :: error', error.message);
	}

	return resp;
};

export const getByTemplateName = async (name) => {
	let whereCondition = [
		{
			template_name: {
				equals: name,
			},
		},
		{
			is_delete: {
				equals: 'N',
			},
		},
	];

	let resp = null;
	try {
		const result = await prisma.template.findMany({
			where: {
				AND: whereCondition,
			},
		});

		resp = bigIntToString(result.length > 0 ? result[0] : null);
	} catch (error) {
		console.log('test template.service getByTemplateName :: error', error.message);
	}
	return resp;
};
export const getByNano = async (name) => {
	var resp = null;
	try {
		const result = await prisma.template.findMany({
			where: {
				AND: [
					{
						template_id: {
							equals: name,
						},
					},
					{
						is_delete: {
							equals: 'N',
						},
					},
				],
			},
		});
		resp = bigIntToString(result.length > 0 ? result[0] : null);
	} catch (error) {
		console.log('test template.service getByNano :: error', error.message);
	}

	return resp;
};

export const getAllTemplates = async (req) => {
	let resp = null;
	try {
		let result = await prisma.template.findMany({
			where: {
				is_delete: 'N',
			},
		});
		resp = bigIntToString(result);
	} catch (error) {
		console.log('test template.service getAllTemplates :: error', error.message);
	}
	return resp;
};

export const deleteById = async (id) => {
	var resp = null;
	try {
		const result = await prisma.template.update({
			where: { id: BigInt(id) },
			data: { is_delete: 'Y' },
		});

		return bigIntToString(result);
	} catch (error) {
		console.log('test template.service deleteById :: error', error.message);
	}
	return resp;
};

export const search = async (data) => {
	let resp = null;
	try {
		let result = await prisma.template.findMany({
			where: {
				AND: [
					{
						template_name: {
							contains: data,
							mode: 'insensitive',
						},
					},
					{
						is_delete: {
							equals: 'N',
						},
					},
				],
			},
		});

		return bigIntToString(result);
	} catch (error) {
		console.log('test template.service search :: error', error.message);
	}
};

export const searchTplByCat = async (category_id) => {
	let resp = null;
	try {
		let result = await prisma.template.findMany({
			where: {
				category_id: Number(category_id),
				is_delete: 'N',
			},
		});

		return bigIntToString(result);
	} catch (error) {
		console.log('test template.service searchTplByCat :: error', error.message);
	}
};