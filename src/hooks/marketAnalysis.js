import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useMarketAnalysisQuery = (payload) => {
  return useQuery({
    queryKey: ["market-analysis", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.marketAnalysis, payload);
      return data?.result;
    },
    refetchInterval: 1000 * 15,
  });
};
