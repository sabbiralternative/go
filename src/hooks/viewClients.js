import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useViewClientsQuery = (payload) => {
  return useQuery({
    queryKey: ["viewClient", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.viewClients, payload);
      return data;
    },
    gcTime: 0,
  });
};
