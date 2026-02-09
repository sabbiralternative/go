import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useDetectUtrMutation = () => {
  return useMutation({
    mutationKey: ["utr"],
    mutationFn: async (filePath) => {
      const { data } = await AxiosSecure.post(`${API.detectUtr}`, { filePath });
      return data;
    },
    gcTime: 0,
  });
};
