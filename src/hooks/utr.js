import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useUTRQuery = (payload, time) => {
  return useQuery({
    queryKey: ["utr", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.utr}`, payload);

      return data;
    },
    refetchInterval: time ? time : null,
  });
};
export const useUTRMutation = () => {
  return useMutation({
    queryKey: ["utr"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.utr}`, payload);
      return data;
    },
  });
};
