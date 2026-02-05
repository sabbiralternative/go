import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useLossBackMutation = () => {
  return useMutation({
    mutationKey: ["loss-back"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.lossback}`, payload);
      return data;
    },
  });
};
export const useLossBackQuery = (payload) => {
  return useQuery({
    queryKey: ["loss-back", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.lossback}`, payload);
      return data;
    },
  });
};
