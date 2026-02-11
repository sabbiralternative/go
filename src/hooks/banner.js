import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useBannerQuery = (payload) => {
  return useQuery({
    queryKey: ["banner", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.banner, payload);
      return data;
    },
    gcTime: 0,
  });
};
