import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { useDetectUtrMutation } from "../../../hooks/detectUtr";
import { useEffect, useState } from "react";
import { useUploadScreenShot } from "../../../hooks/uploadScreenshot";
import { useDepositClientMutation } from "../../../hooks/depositClient";
import GoSelect from "../../shared/form/GoSelect";
import { useWithdrawQuery } from "../../../hooks/withdraw";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditWithdraw = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [filePath, setFilePath] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [filename, setFilename] = useState("");
  const [utr, setUtr] = useState(null);

  const payload = {
    type: "viewSingleWithdraw",
    withdrawId: modal?.withdraw_id,
  };
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  const statusField = watch("status");
  const { data } = useWithdrawQuery(payload);
  const {
    mutate: detectUTR,
    data: utrData,
    isSuccess: isUTRSuccess,
    isPending: isURTPending,
  } = useDetectUtrMutation();
  const { mutate: uploadScreenShot } = useUploadScreenShot();
  const {
    mutate: depositClient,
    isPending,
    isSuccess,
  } = useDepositClientMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
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
  const statusData = [
    { label: "PENDING", key: "PENDING" },
    { label: "APPROVED", key: "APPROVED" },
    { label: "REJECTED", key: "REJECTED" },
  ];

  if (!data?.result) {
    return null;
  }
  console.log(utrData);
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Edit Withdraw</span>
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
              {!utrData?.filePath && statusField === "APPROVED" && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <input onChange={(e) => handleImageChange(e)} type="file" />
                </div>
              )}
              {isURTPending && isUTRSuccess && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <FaSpinner size={30} className="animate-spin" />
                </div>
              )}
              {utrData?.filePath && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="col-sm-10"
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={utrData?.filePath}
                      alt=""
                    />
                    <RxCross2
                      onClick={() => setUploadedImage("")}
                      cursor="pointer"
                      size={20}
                    />
                  </div>
                </div>
              )}

              {statusField === "APPROVED" && (
                <GoInput
                  label="UTR"
                  name="utr"
                  required
                  placeholder="Enter UTR"
                />
              )}

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
                {isSubmitting ? "Loading..." : "Deposit"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default EditWithdraw;
