export interface IRepo {
	id: number;
	repo_id: string;
	repo_name: string;
	company_id: number;
	status: string;
	is_delete: string;
	repo_type: string;
	created_by: number;
	createdAt: Date;
	updatedBy: number;
	updatedAt: Date;
	lead_pages_count?: number;
	blog_pages_count?: number;
}
