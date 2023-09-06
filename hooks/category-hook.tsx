import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchCategory = async (category_id: string) => {
  const response = await axios.get(`/api/category/${category_id}`);
  return response.data;
};

const addCategory = async (data: any) => {
  const response = await axios.post(`/api/category`, data);
  return response.data;
};

const editCategory = async (data: any) => {
  const response = await axios.put(`/api/category`, data);
  return response.data;
};

const deleteCategory = async (category_id: number) => {
  const response = await axios.delete(`/api/category/${category_id}`);
  return response.data;
};

const paginationCategory = async (data: any) => {
  const response = await axios.post(`/api/category/categoryPage`, data);
  return response.data;
};

export const useCategory = (category_id: string) => {
  return useQuery(["category", category_id], () => fetchCategory(category_id), {
    enabled: !!category_id,
    refetchOnMount: true,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => addCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("list-category");
    },
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => editCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("list-category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((category_id: number) => deleteCategory(category_id), {
    onSuccess: () => {
      queryClient.invalidateQueries("list-category");
    },
  });
};

export const useGetCategoryList = (params) => {
  return useQuery(["list-category", params], () => paginationCategory(params), {
    refetchOnMount: true,
  });
};
