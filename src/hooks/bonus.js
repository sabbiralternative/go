import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useBonusQuery = (payload, time) => {
  return useQuery({
    queryKey: ["bonus", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
};
export const useBonusMutation = () => {
  return useMutation({
    mutationKey: ["bonus"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
  });
};
