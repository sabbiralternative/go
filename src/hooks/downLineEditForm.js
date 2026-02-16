import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDownLineEditFormQuery = (payload) => {
  return useQuery({
    queryKey: ["downLineEditForm", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(
        `${API.downlineEditForm}`,
        payload,
      );
      return data;
    },
  });
};
