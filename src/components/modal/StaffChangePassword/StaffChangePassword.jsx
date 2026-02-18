import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useStaffMutation } from "../../../hooks/staff";
import { AdminRole } from "../../../constant/constant";

const StaffChangePassword = ({ modal, setModal, refetch }) => {
  const { adminRole } = useSelector((state) => state.auth);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { mutate: updateStaffPassword } = useStaffMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async ({ password, confirmPassword, mpassword }) => {
    const payload = {
      type: "updateStaffPassword",
      staff_id: modal?.staff_id,
      password,
      confirmPassword,
      mpassword,
    };

    updateStaffPassword(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          refetch();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Change Password</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoInput
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter New Password"
              >
                <i
                  style={{ position: "absolute", right: "10px", top: "33px" }}
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className={`fa-solid ${showNewPassword ? "fa-eye" : "fa-eye-slash"}`}
                />
              </GoInput>
              <GoInput
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Enter Confirm Password"
              >
                <i
                  style={{ position: "absolute", right: "10px", top: "33px" }}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                />
              </GoInput>
              {adminRole === AdminRole.master && (
                <GoInput
                  label="Transaction Code"
                  name="mpassword"
                  required
                  placeholder="Enter Transaction Code"
                />
              )}
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isSubmitting}
                type="submit"
                className="save-btn"
              >
                {isSubmitting ? "Loading..." : "Save changes"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default StaffChangePassword;
