import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useWhiteLabelQuery = (payload) => {
  return useQuery({
    queryKey: ["whiteLabel", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.whitelabel, payload);
      if (data?.success) {
        return data;
      }
    },
    gcTime: 0,
  });
};

export const useWhiteLabelMutation = () => {
  return useMutation({
    mutationKey: ["addWhiteLabel"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.whitelabel, payload);
      return data;
    },
  });
};
