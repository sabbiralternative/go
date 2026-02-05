import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";
import {
  setShowChangePasswordModal,
  setShowLeftSidebar,
} from "../../../redux/features/global/globalSlice";
import ModalWrapper from "../../modal/ModalWrapper/ModalWrapper";
import { logout } from "../../../redux/features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { adminName, adminRole } = useSelector((state) => state.auth);
  const { showLeftSidebar } = useSelector((state) => state.global);

  const closeModal = () => {
    dispatch(setShowLeftSidebar(false));
  };

  return (
    <ModalWrapper onClose={closeModal}>
      <aside
        style={{
          visibility: "visible",
          transform: showLeftSidebar ? "none" : "translate3d(-100%, 0, 0)",
          transition: "0.5s",
        }}
        className="sidebar"
      >
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-name">{adminName}</div>
            <span>{adminRole}</span>
          </div>
          <div onClick={closeModal} className="sidebar-icons">
            <i className="fa-solid fa-arrow-left" />
          </div>
        </div>
        <SidebarMenu />
        <div className="sidebar-footer">
          <button
            onClick={() => {
              dispatch(setShowChangePasswordModal(true));
              closeModal();
            }}
            className="footer-btn"
          >
            <i className="fa-solid fa-key" />
            Change Password
          </button>
          <button
            onClick={() => dispatch(logout())}
            className="footer-btn logout"
          >
            <i className="fa-solid fa-power-off" />
            Logout
          </button>
        </div>
      </aside>
    </ModalWrapper>
  );
};

export default Sidebar;
