import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { handleLogOut } from "./utils/handleLogOut";
import { useNavigate } from "react-router-dom";
import { Settings } from "./api";

const App = () => {
  const navigate = useNavigate();
  const { adminToken } = useSelector((state) => state.auth);

  useEffect(() => {
    let isTokenExpired;
    if (adminToken) {
      const decodedToken = jwtDecode(adminToken);
      const expirationTime = decodedToken.exp;
      isTokenExpired = expirationTime < Date.now() / 1000;
      if (isTokenExpired) {
        handleLogOut();
        navigate("/login");
      }
    } else if (Settings.forceLogin) {
      if (!adminToken) {
        handleLogOut();

        navigate("/login");
      }
    }
  }, [navigate, adminToken]);
  return <MainLayout />;
};

export default App;
