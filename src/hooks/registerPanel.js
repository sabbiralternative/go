import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useRegisterPanelMutation = () => {
  return useMutation({
    mutationKey: ["registerPanel"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.registerPanel}`, payload);
      return data;
    },
  });
};
