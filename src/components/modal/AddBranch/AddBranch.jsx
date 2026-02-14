import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { setShowAddBranchModal } from "../../../redux/features/global/globalSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddBranchMutation } from "../../../hooks/addBranch";
import { useViewBranchesQuery } from "../../../hooks/viewBranches";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";

const AddBranch = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { mutate } = useAddBranchMutation();
  const { refetch } = useViewBranchesQuery({ branch_type: "branch" });
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const closeModal = () => {
    dispatch(setShowAddBranchModal(false));
  };

  const onSubmit = async ({ username, password, notes }) => {
    const payload = {
      username,
      password,
      notes,
      branch_type: "branch",
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetch();
          toast.success("Branch created successfully");
          reset();
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
              <span> Add Branch</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoInput
                name="username"
                label="Username"
                placeholder="Enter User Name"
                required
              />

              <GoInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                placeholder="Enter Password"
                required
              >
                <i
                  style={{ position: "absolute", right: "10px", top: "33px" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                />
              </GoInput>

              <GoInput
                name="notes"
                label="Branch Name"
                placeholder="Enter Branch Name"
                required
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isSubmitting}
                type="submit"
                className="save-btn"
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default AddBranch;
