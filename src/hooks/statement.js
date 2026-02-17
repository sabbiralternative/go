import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useStatementQuery = (payload) => {
  return useQuery({
    queryKey: ["statement", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.statement}`, payload);
      return data;
    },
  });
};
