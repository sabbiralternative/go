import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useSocialLinkQuery = (payload) => {
  return useQuery({
    queryKey: ["socialLink", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.socialLinks, payload);
      return data;
    },
    gcTime: 0,
  });
};

export const useSocialLinkMutation = () => {
  return useMutation({
    mutationKey: ["socialLink"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.socialLinks, payload);
      return data;
    },
  });
};
