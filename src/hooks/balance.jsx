import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { handleLogOut } from "../utils/handleLogOut";
import { useSelector } from "react-redux";
import axios from "axios";

export const useBalanceQuery = (payload) => {
  const { adminToken } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["balance", payload],
    queryFn: async () => {
      const { data } = await axios.post(API.balance, payload, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (data?.success === false && adminToken) {
        handleLogOut();
      } else if (data?.success && adminToken) {
        return data?.result;
      }
    },

    gcTime: 0,
  });
};
