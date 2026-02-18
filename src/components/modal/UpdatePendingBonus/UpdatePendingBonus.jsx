import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import GoSelect from "../../shared/form/GoSelect";
import { useBonusMutation } from "../../../hooks/bonus";

const UpdatePendingBonus = ({ modal, setModal }) => {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { mutate: updateBonus, isPending, isSuccess } = useBonusMutation();

  const closeModal = () => {
    setModal(null);
  };

  const onSubmit = async ({ status }) => {
    const payload = {
      bonus_statement_id: modal?.bonus_statement_id,
      status,
      type: "editBonusStatement",
    };

    updateBonus(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };
  const statusData = [
    { label: "Approve", key: "1" },
    { label: "Reject", key: "2" },
  ];

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span> Update Pending Bonus</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoSelect
                label="Status"
                name="status"
                required
                placeholder="Select"
                data={statusData}
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

export default UpdatePendingBonus;
