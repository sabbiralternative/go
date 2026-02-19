import { Fragment } from "react";
import { useSelector } from "react-redux";
import AddBranch from "../AddBranch/AddBranch";
import AddSuperBranch from "../AddSuperBranch/AddSuperBranch";
import ChangePasswordAuth from "../ChangePasswordAuth/ChangePasswordAuth";
import AddStaff from "../AddStaff/AddStaff";
import AddBranchStaff from "../AddBranchStaff/AddBranchStaff";
import UpdateSocialLink from "../UpdateSocialLink/UpdateSocialLink";
import UpdateDWLimits from "../UpdateDWLimits/UpdateDWLimits";

const Modals = () => {
  const {
    showChangePasswordModal,
    showAddBranchModal,
    showAddSuperBranchModal,
    showAddStaffModal,
    showAddBranchStaffModal,
    showSocialLinkModal,
    showDWLimitModal,
  } = useSelector((state) => state.global);

  return (
    <Fragment>
      {showChangePasswordModal && <ChangePasswordAuth />}
      {showAddBranchModal && <AddBranch />}
      {showAddSuperBranchModal && <AddSuperBranch />}
      {showAddStaffModal && <AddStaff />}
      {showAddBranchStaffModal && <AddBranchStaff />}
      {showSocialLinkModal && <UpdateSocialLink />}
      {showDWLimitModal && <UpdateDWLimits />}
    </Fragment>
  );
};

export default Modals;
