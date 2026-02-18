import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useWithdrawQuery = (payload, time) => {
  return useQuery({
    queryKey: ["withdraw", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.withdraw}`, payload);

      return data;
    },
    refetchInterval: time ? time : null,
  });
};
export const useWithdrawMutation = () => {
  return useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.withdraw}`, payload);
      return data;
    },
  });
};
