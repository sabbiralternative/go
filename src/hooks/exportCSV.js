import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useExportCSVMutation = () => {
  return useMutation({
    mutationKey: ["export-csv"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.exportCSV}`, payload, {
        responseType: "blob",
      });
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
