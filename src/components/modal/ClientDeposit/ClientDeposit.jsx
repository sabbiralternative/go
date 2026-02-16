import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { usePaymentQuery } from "../../../hooks/payments";
import { useDetectUtrMutation } from "../../../hooks/detectUtr";
import { useEffect, useState } from "react";
import { useUploadScreenShot } from "../../../hooks/uploadScreenshot";
import { useDepositClientMutation } from "../../../hooks/depositClient";
import GoSelect from "../../shared/form/GoSelect";

const ClientDeposit = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [filePath, setFilePath] = useState("");
  const [image, setImage] = useState(null);
  let payload = {
    type: "getActivePayments",
    id: modal?.id,
    role: modal?.role,
  };
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { data } = usePaymentQuery(payload);
  const { mutate: detectUTR } = useDetectUtrMutation();
  const { mutate: uploadScreenShot } = useUploadScreenShot();
  const {
    mutate: depositClient,
    isPending,
    isSuccess,
  } = useDepositClientMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  /* Upload image */
  useEffect(() => {
    if (image) {
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "utr",
        };
        formData.append("data", JSON.stringify(payload));

        uploadScreenShot(formData, {
          onSuccess: (uploadData) => {
            if (uploadData?.success) {
              detectUTR(uploadData?.filePath, {
                onSuccess: (utrData) => {
                  if (utrData?.success) {
                    reset({ utr: utrData?.utr });
                  }
                },
              });
              setFilePath(uploadData?.filePath);
            } else {
              toast.error(uploadData?.error);
            }
          },
        });
      };
      handleSubmitImage();
    }
  }, [image, reset, detectUTR, uploadScreenShot]);

  const onSubmit = async ({ amount, utr, paymentId }) => {
    const payload = {
      id: modal?.id,
      downlineId: modal?.downlineId,
      paymentId,
      amount,
      slip: filePath,
      utr,
      role: modal?.role,
    };

    depositClient(payload, {
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

  const paymentMethods = data?.result?.map((item) => ({
    label: item?.name,
    ley: item?.id,
  }));

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
              <GoSelect
                label="Payment"
                name="paymentId"
                required
                placeholder="Select"
                data={paymentMethods}
              />

              <GoInput
                label="Amount"
                name="amount"
                required
                placeholder="Enter Amount"
              />
              <div style={{ position: "relative" }}>
                <label> Deposit Slip</label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </div>
              <GoInput
                label="UTR Code"
                name="utr"
                type="number"
                required
                placeholder="Enter UTR Code"
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
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

export default ClientDeposit;
