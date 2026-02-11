import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useExportMutation = () => {
  return useMutation({
    mutationKey: ["export"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.export, payload);
      return data;
    },
    gcTime: 0,
  });
};
