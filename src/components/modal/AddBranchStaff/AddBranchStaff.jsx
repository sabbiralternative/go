import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import { useStaffMutation, useStaffQuery } from "../../../hooks/staff";
import GoInput from "../../shared/form/GoInput";
import { useState } from "react";
import { setShowAddBranchStaffModal } from "../../../redux/features/global/globalSlice";
import { useGetIndexQuery } from "../../../hooks";
import GoSelect from "../../shared/form/GoSelect";

const AddBranchStaff = () => {
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm();
  const { handleSubmit, reset, register } = methods;
  const { data: branches } = useGetIndexQuery({
    type: "getBranches",
  });
  const { mutate: addBranchStaff, isPending, isSuccess } = useStaffMutation();
  const { refetch } = useStaffQuery({
    type: "viewStaff",
    role: "admin_staff",
  });

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setShowAddBranchStaffModal(null));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: "addStaff",
      role: "branch_staff",
    };

    addBranchStaff(payload, {
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
    { label: "Deposit", value: "deposit", show: true },
    { label: "Withdraw", value: "withdraw", show: true },
    { label: "Client", value: "client", show: true },
    { label: "Add Client", value: "add_client", show: true },
    { label: "Report", value: "report", show: true },
    {
      label: "Direct Deposit",
      value: "directDeposit",
    },
    {
      label: "Deposit With Slip",
      value: "depositWithSlip",
    },
    {
      label: "Direct Withdraw",
      value: "directWithdraw",
    },

    { label: "Exposure", value: "exposure", show: true },
    { label: "Dashboard", value: "dashboard", show: true },
    {
      label: "Password",
      value: "password",
    },
    {
      label: "Branch",
      value: "branch",
    },
    {
      label: "Staff",
      value: "staff",
    },
    {
      label: "Setting",
      value: "setting",
    },
    {
      label: "Complaint",
      value: "complaint",
    },
  ];

  const branchOptions = branches?.result?.map((branch) => ({
    label: branch?.branch_name,
    value: branch?.branch_id,
  }));

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span> Add Branch Staff</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoSelect
                name="branch_id"
                label="Branch"
                placeholder="Select Branch"
                required
                data={branchOptions}
              />
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
                label="Password"
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

export default AddBranchStaff;
