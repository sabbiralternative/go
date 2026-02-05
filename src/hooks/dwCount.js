import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

const useGetDWCountQuery = () => {
  return useQuery({
    queryKey: ["dwCount"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.dwCount);

      return data?.result;
    },
    refetchInterval: 15000,
  });
};

export default useGetDWCountQuery;
