import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAdminMutation = () => {
  return useMutation({
    mutationKey: ["admin"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.admin, payload);
      return data;
    },
  });
};
export const useAdminQuery = (payload) => {
  return useQuery({
    queryKey: ["admin", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.admin, payload);
      return data;
    },
    gcTime: 0,
  });
};
