import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useStaffMutation = () => {
  return useMutation({
    mutationKey: ["add-staff"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};

export const useStaffQuery = (payload) => {
  return useQuery({
    queryKey: ["view-staff", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};
