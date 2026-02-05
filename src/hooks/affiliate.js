import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAffiliateMutation = () => {
  return useMutation({
    mutationKey: ["affiliate"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.affiliate, payload);
      return data;
    },
    gcTime: 0,
  });
};
export const useAffiliateQuery = (payload) => {
  return useQuery({
    queryKey: ["affiliate", payload],
    enabled: payload?.affiliate_id !== null,
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.affiliate, payload);
      return data;
    },
    gcTime: 0,
  });
};
