import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const usePermission = () => {
  const { adminToken } = useSelector((state) => state.auth);

  const permissions = useMemo(() => {
    if (!adminToken) return [];

    try {
      const decoded = jwtDecode(adminToken);

      return Array.isArray(decoded?.permissions) ? decoded.permissions : [];
    } catch (err) {
      console.error("Invalid JWT:", err);
      return [];
    }
  }, [adminToken]);

  return { permissions };
};
