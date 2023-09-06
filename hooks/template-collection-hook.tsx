import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getTemplateCollection = async (template_id: string) => {
  const response = await axios.get(`/api/template-collection/${template_id}`);
  return response.data;
};

const getAllTemplateCollections = async () => {
  const response = await axios.get(`/api/template-collection`);
  return response.data;
};

const addTemplateCollection = async (data: any) => {
  const response = await axios.post("/api/template-collection", data);
  return response.data;
};

const updateTemplateCollection = async (data: any) => {
  const response = await axios.put("/api/template-collection", data);
  return response.data;
};

const deleteTemplateCollection = async (template_id: string) => {
  const response = await axios.delete(
    `/api/template-collection/${template_id}`
  );
  return response.data;
};

export const useGetTemplateCollection = (template_id: string) => {
  return useQuery(
    ["template-collection", template_id],
    () => getTemplateCollection(template_id),
    {
      enabled: !!template_id,
      refetchOnMount: true,
    }
  );
};

export const useGetAllTemplateCollections = () => {
  return useQuery(["template-collection"], () => getAllTemplateCollections());
};

export const useAddTemplateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addTemplateCollection(data), {
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries(
        ["template-collection"],
        variables.template_id
      );
    },
  });
};

export const useUpdateTemplateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateTemplateCollection(data), {
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries(
        ["template-collection"],
        variables.template_id
      );
    },
  });
};

const useDeleteTemplateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation((template_id) => deleteTemplateCollection(template_id), {
    onSuccess: (res: any, variables: any) => {
      queryClient.invalidateQueries(["template-collection"], res?.template_id);
    },
  });
};
