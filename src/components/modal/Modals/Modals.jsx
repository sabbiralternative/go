import { Fragment } from "react";
import { useSelector } from "react-redux";
import AddBranch from "../AddBranch/AddBranch";
import AddSuperBranch from "../AddSuperBranch/AddSuperBranch";
import ChangePasswordAuth from "../ChangePasswordAuth/ChangePasswordAuth";

const Modals = () => {
  const {
    showChangePasswordModal,
    showAddBranchModal,
    showAddSuperBranchModal,
  } = useSelector((state) => state.global);

  return (
    <Fragment>
      {showChangePasswordModal && <ChangePasswordAuth />}
      {showAddBranchModal && <AddBranch />}
      {showAddSuperBranchModal && <AddSuperBranch />}
    </Fragment>
  );
};

export default Modals;
