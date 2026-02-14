import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDownLineEditQuery = (payload) => {
  return useQuery({
    queryKey: ["downLineEdit", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.downLineEdit}`, payload);
      return data;
    },
  });
};
export const useDownLineEditMutation = () => {
  return useMutation({
    mutationKey: ["downLineEdit"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.downLineEdit}`, payload);
      return data;
    },
  });
};
