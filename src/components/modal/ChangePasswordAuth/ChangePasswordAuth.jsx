import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { setShowChangePasswordModal } from "../../../redux/features/global/globalSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { handleLogOut } from "../../../utils/handleLogOut";

const ChangePasswordAuth = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setShowChangePasswordModal(false));
  };

  const [disabled, setDisabled] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  /* handle change password  */
  const onSubmit = async ({ oldPassword, newPassword, confirmPassword }) => {
    setDisabled(true);

    const payload = {
      newPassword,
      oldPassword,
      confirmPassword,
      changePasswordType: "after_login",
    };
    const res = await AxiosSecure.post(API.changePassword, payload);
    const data = res.data;

    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      setTimeout(() => {
        dispatch(setShowChangePasswordModal(true));
        handleLogOut();
        navigate("/login");
      }, 1000);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="change-password-modal"
        >
          {/* Modal Header */}
          <div className="modal-header">
            <span>Change Password</span>
            <span onClick={closeModal} className="close-icon">
              ✕
            </span>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            <div style={{ position: "relative" }}>
              <label>Old password</label>
              <input
                type={showOldPassword ? "text" : "password"}
                {...register("oldPassword", {
                  required: true,
                })}
                placeholder="Old Password"
              />
              <i
                style={{ position: "absolute", right: "10px", top: "33px" }}
                onClick={() => setShowOldPassword((prev) => !prev)}
                className={`fa-solid ${showOldPassword ? "fa-eye" : "fa-eye-slash"}`}
              />
            </div>
            <div style={{ position: "relative" }}>
              <label>Enter new password</label>
              <input
                {...register("newPassword", {
                  required: true,
                })}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <i
                style={{ position: "absolute", right: "10px", top: "30px" }}
                onClick={() => setShowNewPassword((prev) => !prev)}
                className={`fa-solid ${showNewPassword ? "fa-eye" : "fa-eye-slash"}`}
              />
            </div>
            <div style={{ position: "relative" }}>
              <label>Confirm Password</label>
              <input
                {...register("confirmPassword", {
                  required: true,
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter Password"
              />
              <i
                style={{ position: "absolute", right: "10px", top: "30px" }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
              />
            </div>
          </div>
          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="submit" disabled={disabled} className="save-btn">
              Save
            </button>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default ChangePasswordAuth;
