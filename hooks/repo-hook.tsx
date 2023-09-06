import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchRepo = async () => {
  const response = await axios.get(`/api/repository/fetch-repos-summary`);
  return response.data;
};

const addRepo = async (data: any) => {
  const res = await axios.post("/api/repository", data);
  return res.data;
};

export const useGetRepo = () => {
  return useQuery(["repos"], () => fetchRepo(), {
    refetchOnMount: true,
  });
};

export const useAddRepo = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => addRepo(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["repos", variables.company_id]);
    },
  });
};
