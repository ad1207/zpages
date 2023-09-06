import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addBlog = async (data: any) => {
  const response = await axios.post(`/api/blog/add`, data);
  return response.data;
};

const paginationBlog = async (data: any) => {
  const response = await axios.post(`/api/blog/page`, data);
  return response.data;
};

const fetchBlogById = async (blog_id: string) => {
  const response = await axios.get(`/api/blog/blogid/${blog_id}`);
  return response.data;
};

const fetchBlogByNano = async (blog_nano: string) => {
  const response = await axios.get(`/api/blog/blogByNano/${blog_nano}`);
  return response.data;
};

const autoSave = async (req_body: any) => {
  const { blog_id, value, key, req_data } = req_body;
  let req = {
    id: blog_id,
    req_data: req_data,
  };
  const res = await axios.put(`/api/blog/auto-save/`, req);
  return res.data;
};

export const useBlogById = (blog_id: string) => {
  return useQuery(["blog", blog_id], () => fetchBlogById(blog_id), {
    enabled: !!blog_id,
    refetchOnMount: true,
  });
};

export const useBlogByNano = (blog_nano: string) => {
  return useQuery(["blog", blog_nano], () => fetchBlogByNano(blog_nano), {
    enabled: !!blog_nano,
    refetchOnMount: true,
  });
};

export const useAutoSaveBlog = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => autoSave(data), {
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["blog", res.blog_id]);
    },
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => addBlog(data), {
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["blog", res.blog_id]);
    },
  });
};

export const useGetBlogList = (params: any) => {
  return useQuery(["list-blogs", params], () => paginationBlog(params), {
    refetchOnMount: true,
  });
};
