import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getAuthor = async (company_id: string) => {
  const response = await axios.get(`/api/author/${company_id}`);
  return response.data;
};

const addAuthor = async (data: any) => {
  const response = await axios.post(`/api/author`, data);
  return response.data;
};

export const useGetAuthor = (company_id: string) => {
  return useQuery(["author", company_id], () => getAuthor(company_id), {
    enabled: !!company_id,
    refetchOnMount: true,
  });
};

export const useAddAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => addAuthor(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["author", variables.user_id]);
    },
  });
};
