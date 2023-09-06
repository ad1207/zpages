import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchLeadPage = async (repo_id: string) => {
  const response = await axios.get(`/api/lead-page/repo/${repo_id}`);
  return response.data;
};

const postLeadPage = async (values: any) => {
  const response = await axios.post(`/api/lead-page`, values);
  return response.data;
};

const paginationLeadPage = async (data: any) => {
  const res = await axios.post("/api/lead-page/leadsPage", data);
  return res.data;
};

export const useGetLeadPage = (repo_id: string) => {
  return useQuery(["leadPage", repo_id], () => fetchLeadPage(repo_id), {
    enabled: !!repo_id,
    refetchOnMount: true,
  });
};

export const usePostLeadPage = () => {
  const queryClient = useQueryClient();
  return useMutation((values: any) => postLeadPage(values), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["list-leadPage", variables.templateId]);
    },
  });
};

export const useGetLeadPageList = (params: any) => {
  return useQuery(["list-leadPage", params], () => paginationLeadPage(params), {
    //   enabled: !!params?.company_id,
    refetchOnMount: true,
  });
};
