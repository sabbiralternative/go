import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar/Sidebar";
import Modals from "../modal/Modals/Modals";

const MainLayout = () => {
  return (
    <Fragment>
      <Modals />
      <Sidebar />
      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
