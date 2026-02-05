import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useUser = () => {
  const { adminToken } = useSelector((state) => state.auth);

  const user = useMemo(() => {
    if (!adminToken) return [];

    try {
      const decoded = jwtDecode(adminToken);
      return decoded;
    } catch (err) {
      console.error("Invalid JWT:", err);
      return [];
    }
  }, [adminToken]);

  return { user };
};
