import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { useDownLineEditMutation } from "../../../hooks/downLineEdit";

const Deposit = ({ modal, setModal, refetch }) => {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { mutate: downLineEdit } = useDownLineEditMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async ({ amount, remark }) => {
    const payload = {
      downlineId: modal?.username,
      type: "deposit",
      amount,
      remark,
      role: modal?.role,
      id: modal.id,
    };

    downLineEdit(payload, {
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
              <span>Deposit</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoInput
                label="Amount"
                type="number"
                name="amount"
                required
                placeholder="Enter Amount"
              />

              <GoInput
                label="Remark"
                name="remark"
                required
                placeholder="Enter Remark"
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isSubmitting}
                type="submit"
                className="save-btn"
              >
                {isSubmitting ? "Loading..." : "Deposit"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default Deposit;
