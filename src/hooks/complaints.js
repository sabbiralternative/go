import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useComplaintsQuery = (payload) => {
  return useQuery({
    queryKey: ["complaints", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.complaint, payload);
      return data;
    },
    gcTime: 0,
  });
};
export const useComplaintsMutation = () => {
  return useMutation({
    mutationKey: ["complaints"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.complaint, payload);
      return data;
    },
  });
};
