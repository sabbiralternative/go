import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useDepositClientMutation = () => {
  return useMutation({
    mutationKey: ["deposit-client"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.depositClient}`, payload);
      return data;
    },
  });
};
