import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const usePaymentQuery = (payload) => {
  return useQuery({
    queryKey: ["payments", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.payments, payload);
      return data;
    },
  });
};
