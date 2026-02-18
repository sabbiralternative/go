import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import GoCheckbox from "../../shared/form/GoCheckbox";
import { useStaffMutation, useStaffQuery } from "../../../hooks/staff";

const UpdateStaffStatus = ({ modal, setModal, refetch }) => {
  const { adminRole } = useSelector((state) => state.auth);
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const { data } = useStaffQuery({
    type: "viewSingleStaff",
    staff_id: modal?.staff_id,
  });
  const {
    mutate: updateStaffStatus,
    isPending,
    isSuccess,
  } = useStaffMutation();

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async ({ status }) => {
    const payload = {
      type: "updateStaffStatus",
      staff_id: modal?.staff_id,
      status: status ? 1 : 0,
    };

    updateStaffStatus(payload, {
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

  if (!data?.result) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Change Status</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoCheckbox
                defaultChecked={data?.result?.[0]?.status === 1}
                label={
                  adminRole === "master" ? "Staff Status" : "Admin Staff Status"
                }
                type={"checkbox"}
                name="status"
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Save changes"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default UpdateStaffStatus;
