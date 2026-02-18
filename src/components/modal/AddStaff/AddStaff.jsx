import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import { useStaffMutation, useStaffQuery } from "../../../hooks/staff";
import { AdminRole } from "../../../constant/constant";
import GoInput from "../../shared/form/GoInput";
import { useState } from "react";
import { setShowAddStaffModal } from "../../../redux/features/global/globalSlice";

const AddStaff = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { adminRole } = useSelector((state) => state.auth);
  const methods = useForm();
  const { handleSubmit, reset, register } = methods;

  const { mutate: addStaff, isPending, isSuccess } = useStaffMutation();
  const { refetch } = useStaffQuery({
    type: "viewStaff",
    role: "admin_staff",
  });

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setShowAddStaffModal(null));
  };

  const onSubmit = async (values) => {
    let payload;
    if (adminRole === AdminRole.master) {
      payload = {
        ...values,
        type: "addStaff",
      };
    } else {
      payload = {
        ...values,
        type: "addStaff",
        role: "admin_staff",
      };
    }

    addStaff(payload, {
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

  const permissionsList = [
    {
      label: "Dashboard",
      value: "dashboard",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Deposit",
      value: "deposit",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Withdraw",
      value: "withdraw",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Client",
      value: "client",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Payment",
      value: "payment",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Report",
      value: "report",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Settings",
      value: "setting",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Bonus",
      value: "bonus",
      show: adminRole === AdminRole.master,
    },
    {
      label: "Exposure",
      value: "exposure",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },

    {
      label: "Password",
      value: "password",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Branch",
      value: "branch",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Complaint",
      value: "complaint",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Staff",
      value: "staff",
      show:
        adminRole === AdminRole.master || adminRole === AdminRole.hyper_master,
    },
    {
      label: "Affiliate",
      value: "affiliate",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Change Branch",
      value: "change_branch",
      show: adminRole === AdminRole.hyper_master,
    },
  ];

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>
                {" "}
                Add {adminRole === "master" ? "Staff" : "Admin Staff"}
              </span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoInput
                name="staffname"
                label="Staff Name"
                placeholder="Enter Staff Name"
                required
              />
              <GoInput
                name="username"
                label="Username"
                placeholder="Enter Username"
                required
              />
              <GoInput
                label="New Password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter New Password"
              >
                <i
                  style={{ position: "absolute", right: "10px", top: "33px" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                />
              </GoInput>
              <div style={{ position: "relative" }}>
                <label> Permissions</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0px 20px",
                  }}
                >
                  {permissionsList?.map((permission) => {
                    if (!permission?.show) return;
                    return (
                      <label
                        key={permission.value}
                        style={{
                          display: "flex",
                          width: "fit-content",
                          gap: "5px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <input
                          style={{ width: "fit-content" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          value={permission.value}
                        />
                        <span> {permission?.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Add"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default AddStaff;
