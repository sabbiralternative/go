import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useCheckerMutation = () => {
  return useMutation({
    mutationKey: ["add-checker"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};

export const useStaffQuery = () => {
  return useQuery({
    queryKey: ["view-checker"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.staff, {
        type: "viewStaff",
        role: "admin_staff",
      });
      return data;
    },
  });
};
