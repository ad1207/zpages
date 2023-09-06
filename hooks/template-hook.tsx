import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getAllTemplates = async () => {
  const response = await axios.get(`/api/template`);
  return response.data;
};

const addTemplate = async (data: any) => {
  const response = await axios.post("/api/template", data);
  return response.data;
};

const updateTemplate = async (data: any) => {
  const response = await axios.put("/api/template", data);
  return response.data;
};

const deleteTemplate = async (template_id: string) => {
  const response = await axios.delete(`/api/template/${template_id}`);
  return response.data;
};

export const useGetAllTemplates = () => {
  return useQuery(["template"], () => getAllTemplates());
};

export const useAddTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addTemplate(data), {
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries(["template"], variables.template_id);
    },
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateTemplate(data), {
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries(["template"], variables.template_id);
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation((template_id: string) => deleteTemplate(template_id), {
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["template", res?.template_id]);
    },
  });
};
