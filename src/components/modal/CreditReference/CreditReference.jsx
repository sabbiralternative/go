import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import {
  useDownLineEditMutation,
  useDownLineEditQuery,
} from "../../../hooks/downLineEdit";

const CreditReference = ({ modal, setModal, refetch }) => {
  const payload = {
    downlineId: modal?.username,
    type: "viewCreditReference",
    role: modal?.role,
    id: modal.id,
  };
  const { data } = useDownLineEditQuery(payload);
  const methods = useForm({
    defaultValues: {
      amount: data?.result?.creditReference,
    },
  });
  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();
  const {
    mutate: downLineEdit,
    isPending,
    isSuccess,
  } = useDownLineEditMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async ({ amount }) => {
    const payload = {
      downlineId: modal?.username,
      type: "updateCreditReference",
      amount,
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
              <span> Credit Reference</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div style={{ position: "relative" }}>
                <label> Username</label>
                <input
                  readOnly
                  value={data?.result?.loginname}
                  style={{ background: "transparent" }}
                />
              </div>

              <GoInput
                label="Amount"
                type="number"
                name="amount"
                required
                placeholder="Enter Amount"
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Update"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default CreditReference;
