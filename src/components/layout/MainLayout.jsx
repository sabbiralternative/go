import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header/Header";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
