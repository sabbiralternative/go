import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header/Header";
import Sidebar from "../ui/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
