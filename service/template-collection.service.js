import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import httpStatus from "http-status";

export const create = async (body) => {
	var resp = null;
	let result = null;
	try {
		console.log('test request data', body);
		const { name, description, tempList } = body;
		let status = `A`;
		let is_delete = `N`;
		let date = new Date();

		result = await prisma.collection.create({
			data: {
				name: name,
				status: status,
				description: description,
				is_delete: is_delete,
				createdAt: date,
				template_collection: {
					create: tempList === undefined ? [] : tempList,
					// create: tempList
				},
			},
		});
		resp = bigIntToString(result);
		return resp;
	} catch (error) {
		console.log('test create (template-collection) --->', error.message);
	}
	return resp;
};

export const updateTemplateCollection = async (body) => {
	let resp = null;
	let result = null;
	try {
		console.log('updateTemplateCollection request data', body);
		const { name, description, tempList, id, status } = body;

		if (tempList.length > 0) {
			await prisma.template_collection.deleteMany({
				where: {
					collection_id: BigInt(id),
				},
			});
		}

		let date = new Date();

		result = await prisma.collection.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				status: status,
				description: description,
				updatedAt: date,
				template_collection: {
					create: tempList === undefined ? [] : tempList,
				},
			},
		});
		resp = bigIntToString(result);
		return resp;
	} catch (error) {
		console.log('test updateTemplateCollection error :: ', error);
	}
	return resp;
};

export const getAllTemplatesInCollection = async () => {
	let resp = null;
	let result = null;
	try {
		console.log('get All request data');

		const result = await prisma.collection.findMany({
			where: {
				is_delete: 'N',
			},
			include: {
				template_collection: true,
			},
		});
		resp = bigIntToString(result);
	} catch (error) {
		console.log('test getAllTempGroup error :: --->', error.message);
	}
	return resp;
};

export const getTemplateCollectionById = async (id) => {
	var resp = [];
	try {
		const result = await prisma.collection.findMany({
			where: {
				is_delete: 'N',
				id: BigInt(id),
			},
			include: {
				template_collection: {
					include: {
						template: true,
					},
				},
			},
		});
		resp = bigIntToString(result.length > 0 ? result[0] : []);
		return resp;
	} catch (error) {
		console.log('test getTemplateCollectionById error :: --->', error.message);
	}
	return resp;
};

export const getCollection = async (id) => {
	var resp = null;
	try {
		const result = await prisma.collection.findUnique({
			where: {
				id: BigInt(id),
				is_delete: 'N',
			},
		});
		resp = bigIntToString(result);
		return resp;
	} catch (error) {
		console.log('test deleteById error :: --->', error.message);
	}
	return resp;
};

export const deleteById = async (id) => {
	var resp = null;
	try {
		const result = await prisma.collection.update({
			where: {
				id: BigInt(id),
			},
			data: {
				is_delete: 'Y',
			},
		});
		resp = bigIntToString(result);
		return resp;
	} catch (error) {
		console.log('test deleteById error :: --->', error.message);
	}
	return resp;
};