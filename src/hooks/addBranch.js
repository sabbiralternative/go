import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useAddBranchMutation = () => {
  return useMutation({
    mutationKey: ["add-branch"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.addBranch, payload);
      return data;
    },
  });
};
