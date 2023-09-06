import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchTag = async (company_id:string) => {
	const response = await axios.get(`/api/tag/${company_id}`);
	return response.data;
};

const addTag = async (data:any) => {
	const res = await axios.post("/api/tag", data);
	return res.data;
};

const editTag = async (data:any) => {
	const res = await axios.put("/api/tag", data);
	return res.data;
};

const deleteTag = async (company_id:string) => {
	const res = await axios.delete(`/api/tag/${company_id}`);
	return res.data;
};

const paginationTag = async (data:any) => {
	const res = await axios.post("/api/tag/tagPage", data);
	return res.data;
};

export const useAddTag = () => {
	const queryClient = useQueryClient();
	return useMutation((data: any) => addTag(data), {
		onSuccess: (res, req) => {
			queryClient.invalidateQueries('list-tags', req.company_id);
		},
	});
};

export const useEditTag = () => {
	const queryClient = useQueryClient();
	return useMutation((data: any) => editTag(data), {
		onSuccess: (res, req) => {
			queryClient.invalidateQueries('list-tags', req.company_id);
		},
	});
};

export const useDeleteTag = () => {
	const queryClient = useQueryClient();
	return useMutation((company_id: any) => deleteTag(company_id), {
		onSuccess: (res, req) => {
			queryClient.invalidateQueries('list-tags', req.company_id);
		},
	});
};

export const useGetTagList = (params) => {
	return useQuery(['list-tags', params.company_id], () => paginationTag(params), {
		enabled: !!params?.company_id,
	});
}