import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import GoSelect from "../../shared/form/GoSelect";
import { useBonusMutation, useBonusQuery } from "../../../hooks/bonus";

const EditCoupon = ({ setEditCouponId, editCouponId, refetchCoupons }) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const closeModal = () => {
    setEditCouponId(null);
  };

  const {
    mutateAsync: handleEditCoupon,
    isPending,
    isSuccess,
  } = useBonusMutation();
  const { data } = useBonusQuery({
    type: "viewSingleCoupon",
    coupon_id: editCouponId,
  });

  /* handle edit user lock */
  const onSubmit = async ({ status }) => {
    const data = await handleEditCoupon({
      type: "editCoupon",
      coupon_id: editCouponId,
      status,
    });

    if (data?.success) {
      refetchCoupons();
      toast.success(data?.result?.message);
      closeModal();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  if (data === undefined) {
    return null;
  }

  const options = [
    { label: "Inactive", value: "2" },
    { label: "Active", value: "1" },
  ];

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span> Edit Coupon</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoSelect
                defaultValue={data?.result?.status}
                name="status"
                label="Status"
                placeholder="Select Branch"
                required
                data={options}
              />
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

export default EditCoupon;
