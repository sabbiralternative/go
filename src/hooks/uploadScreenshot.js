import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useUploadScreenShot = () => {
  return useMutation({
    mutationKey: ["uploadScreenshot"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(
        `${API.uploadScreenshot}`,
        payload,
      );

      return data;
    },
  });
};
