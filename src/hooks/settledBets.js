import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useSettledBetsQuery = (payload) => {
  return useQuery({
    queryKey: ["settledBets", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.settledBets}`, payload);
      return data;
    },
  });
};
