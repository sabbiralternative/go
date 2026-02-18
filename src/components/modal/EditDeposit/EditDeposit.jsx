import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import GoSelect from "../../shared/form/GoSelect";
import { useUTRMutation, useUTRQuery } from "../../../hooks/utr";

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
  const statusData = [
    { label: "PENDING", key: "PENDING" },
    { label: "APPROVED", key: "APPROVED" },
    { label: "REJECTED", key: "REJECTED" },
  ];

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

              <GoSelect
                label="Status"
                name="status"
                required
                placeholder="Select"
                data={statusData}
                defaultValue={data?.result?.status}
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
