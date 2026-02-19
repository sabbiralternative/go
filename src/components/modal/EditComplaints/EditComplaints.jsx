import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import GoCheckbox from "../../shared/form/GoCheckbox";
import {
  useComplaintsMutation,
  useComplaintsQuery,
} from "../../../hooks/complaints";
import GoTextarea from "../../shared/form/Textarea";

const EditComplaints = ({ modal, setModal, refetch }) => {
  const payload = {
    type: "viewSingleComplaint",
    complaint_id: modal?.complaint_id,
  };
  const { data: singleComplaint } = useComplaintsQuery(payload);
  const {
    mutate: updateComplaint,
    isPending,
    isSuccess,
  } = useComplaintsMutation();
  const methods = useForm({
    defaultValues: {
      admin_message: singleComplaint?.result?.admin_message,
    },
  });
  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async ({ admin_message, status }) => {
    const payload = {
      complaint_id: modal?.complaint_id,
      type: "editComplaint",
      status: status ? 1 : 0,
      admin_message,
    };

    updateComplaint(payload, {
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

  if (!singleComplaint?.result) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Edit Complaint</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoCheckbox
                defaultChecked={singleComplaint?.result?.status === 1}
                label="Resolved"
                type={"checkbox"}
                name="status"
              />
              <div style={{ position: "relative" }}>
                <label>Client Message</label>
                <textarea
                  readOnly={true}
                  type="text"
                  value={singleComplaint?.result?.message}
                />
              </div>
              <GoTextarea
                label="Admin Message"
                name="admin_message"
                placeholder="Enter your message for client"
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

export default EditComplaints;
