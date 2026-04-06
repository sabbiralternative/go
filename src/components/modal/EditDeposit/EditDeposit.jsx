import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { useUTRMutation, useUTRQuery } from "../../../hooks/utr";
import GoRadio from "../../shared/form/GoRadio";
import GoCheckbox from "../../shared/form/GoCheckbox";

const EditDeposit = ({ modal, setModal, refetch }) => {
  const dispatch = useDispatch();
  const payload = {
    type: "viewSingleUTR",
    depositId: modal?.id,
  };
  const { data } = useUTRQuery(payload);
  const methods = useForm({
    defaultValues: {
      bank_name: data?.result?.bank_name,
      account_number: data?.result?.account_number,
      remark: data?.result?.remark,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { mutate, isPending, isSuccess } = useUTRMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: "editUTR",
      depositId: modal?.id,
      lock_withdraw: values.lock_withdraw ? 1 : 0,
    };

    mutate(payload, {
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
              <span>Edit Deposit</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div style={{ position: "relative" }}>
                <label> Amount</label>
                <input
                  readOnly
                  value={data?.result?.amount}
                  style={{ background: "transparent" }}
                />
              </div>

              <div>
                <label>Status</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0px 10px",
                  }}
                >
                  <GoRadio
                    required
                    label="Approve"
                    name="status"
                    value="APPROVED"
                  />

                  <GoRadio
                    required
                    label="Reject"
                    name="status"
                    value="REJECTED"
                  />
                </div>
              </div>
              <GoCheckbox
                type="checkbox"
                label="Lock Withdraw"
                name="lock_withdraw"
              />
              <GoInput
                label="Bank Name"
                name="bank_name"
                required
                placeholder="Enter Bank Name"
              />
              <GoInput
                label="Account Number"
                name="account_number"
                required
                placeholder="Enter Account Number"
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
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isSubmitting ? "Loading..." : "Update"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default EditDeposit;
