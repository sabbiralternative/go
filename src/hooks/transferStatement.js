import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useTransferStatementMutation = () => {
  return useMutation({
    mutationKey: ["transferStatement"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.transferStatement, payload);
      return data;
    },
    gcTime: 0,
  });
};
