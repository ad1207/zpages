export interface IBlog {
	id: number;
	blog_id: string;
	title: string;
	description: string;
	slug: string;
	excerpt: string;
	body: string;
	category: [];
	tag: [];
	company_id: string;
	repo_id: number;
	author: string;
	is_delete: string;
	blog_date: Date;
	status: string;
	published: string;
	published_on: Date;
	created_by: number;
	createdAt: Date;
	updatedBy: number;
	updatedAt: Date;
}
