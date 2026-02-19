import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import GoSelect from "../../shared/form/GoSelect";
import { useWhiteLabelQuery } from "../../../hooks/whiteLabel";
import { AdminRole } from "../../../constant/constant";
import { setShowDWLimitModal } from "../../../redux/features/global/globalSlice";
import { useGetIndexMutation, useGetIndexQuery } from "../../../hooks";

const UpdateDWLimits = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: branches } = useWhiteLabelQuery({
    type: "viewWhitelabelByAdmin",
  });

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  const site = watch("site");

  const { data: dwLimit } = useGetIndexQuery({
    site,
    type: "viewDWLimit",
  });
  const { mutate: updateDWLimit, isSuccess, isPending } = useGetIndexMutation();

  const closeModal = () => {
    dispatch(setShowDWLimitModal(null));
  };

  const onSubmit = async (fieldValues) => {
    const payload = {
      type: "updateDWLimit",
      ...fieldValues,
    };

    updateDWLimit(payload, {
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

  const siteData = branches?.result?.map((item) => ({
    label: item?.site_url,
    key: item?.site_url,
  }));
  useEffect(() => {
    if (dwLimit?.success) {
      reset({
        site,
        ...dwLimit?.result,
      });
    }
  }, [dwLimit, reset, site]);

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Update D/W limits</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              {adminRole === AdminRole.hyper_master && (
                <GoSelect
                  data={siteData}
                  label="Site"
                  name="site"
                  required
                  placeholder="Select Site"
                />
              )}

              <GoInput
                label="Deposit Limit"
                name="deposit_limit"
                required
                placeholder="Enter Deposit Limit"
              />

              <GoInput
                label="Withdraw Limit"
                name="withdraw_limit"
                required
                placeholder="Enter Withdraw Limit"
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

export default UpdateDWLimits;
