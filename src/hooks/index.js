import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useGetIndexQuery = (payload) => {
  return useQuery({
    queryKey: ["index", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.index}`, payload);
      return data;
    },
    gcTime: 0,
  });
};
export const useGetIndexMutation = () => {
  return useMutation({
    mutationKey: ["index"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.index}`, payload);
      return data;
    },
  });
};
