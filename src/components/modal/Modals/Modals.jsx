import { Fragment } from "react";
import { useSelector } from "react-redux";
import ChangePassword from "../ChangePassword/ChangePassword";

const Modals = () => {
  const { showChangePasswordModal } = useSelector((state) => state.global);
  return <Fragment>{showChangePasswordModal && <ChangePassword />}</Fragment>;
};

export default Modals;
