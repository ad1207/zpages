import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getCompany = async (company_id: string) => {
  const response = await axios.get(`/api/company/${company_id}`);
  return response.data;
};

const addCompany = async (data: any) => {
  const res = await axios.post("/api/company", data);
  return res.data;
};

const editCompany = async (data: any) => {
  const res = await axios.put("/api/company", data);
  return res.data;
};

const deleteCompany = async (company_id: string) => {
  const res = await axios.delete(`/api/company/${company_id}`);
  return res.data;
};

export const useGetCompany = (company_id: string) => {
  return useQuery(["company", company_id], () => getCompany(company_id), {
    enabled: !!company_id,
    refetchOnMount: true,
  });
};

export const useAddCompany = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => addCompany(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["company", variables.company_id]);
    },
  });
};

export const useEditCompany = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => editCompany(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["company", variables.company_id]);
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation((company_id: string) => deleteCompany(company_id), {
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["company", res?.company_id]);
    },
  });
};
