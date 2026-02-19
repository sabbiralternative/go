import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import GoSelect from "../../shared/form/GoSelect";
import { useBannerMutation, useBannerQuery } from "../../../hooks/banner";
import { useEffect } from "react";

const EditBanner = ({ modal, setModal, refetch }) => {
  const dispatch = useDispatch();
  const payload = {
    type: "getSingleBanner",
    bannerId: modal?.banner_id,
  };
  const { data } = useBannerQuery(payload);
  const { mutate: editBanner, isPending, isSuccess } = useBannerMutation();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: "updateBanner",
      bannerId: modal?.banner_id,
    };

    editBanner(payload, {
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
    { label: "Active", key: "1" },
    { label: "InActive", key: "0" },
  ];

  useEffect(() => {
    if (data?.result)
      reset({
        priority: data?.result?.[0]?.priority,
      });
  }, [data, reset]);

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
              <span>Edit Banner</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoInput
                label="Priority"
                name="priority"
                required
                placeholder="Enter Priority"
              />
              <GoSelect
                label="Status"
                name="status"
                required
                placeholder="Select"
                data={statusData}
                defaultValue={data?.result?.[0]?.status}
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

export default EditBanner;
