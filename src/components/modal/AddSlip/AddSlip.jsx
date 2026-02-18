import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import { useDetectUtrMutation } from "../../../hooks/detectUtr";
import { useEffect, useState } from "react";
import { useUploadScreenShot } from "../../../hooks/uploadScreenshot";
import { useWithdrawMutation } from "../../../hooks/withdraw";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AddSlip = ({ modal, setModal, refetch }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [filename, setFilename] = useState("");
  const [utr, setUtr] = useState(null);

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { mutate: detectUTR } = useDetectUtrMutation();
  const { mutate: uploadScreenShot } = useUploadScreenShot();
  const {
    mutate: addSlipMutation,
    isPending,
    isSuccess,
  } = useWithdrawMutation();

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
      setLoading(true);
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
                    setUtr(utrData?.utr);
                  }
                },
              });
              setLoading(false);
              setImage(null);
              setUploadedImage(uploadData?.filePath);
              setFilename(uploadData?.filePath);
            } else {
              setLoading(false);
              setFilename("");
              setImage(null);
              setUtr(null);
              setUploadedImage(null);
              toast.error(uploadData?.error);
            }
          },
        });
      };
      handleSubmitImage();
    }
  }, [image, reset, detectUTR, uploadScreenShot]);

  const onSubmit = async () => {
    const payload = {
      withdrawId: modal?.withdraw_id,
      utr,
      type: "uploadSlip",
      fileName: filename,
    };

    addSlipMutation(payload, {
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
              <span>Add Slip</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              {!uploadedImage && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <input onChange={(e) => handleImageChange(e)} type="file" />
                </div>
              )}
              {!uploadedImage && loading && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaSpinner size={30} className="animate-spin" />
                  </div>
                </div>
              )}
              {uploadedImage && !loading && (
                <div style={{ position: "relative" }}>
                  <label> Withdraw Slip</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={uploadedImage}
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

              <div style={{ position: "relative" }}>
                <label> UTR (Optional)</label>
                <input
                  type="text"
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="Enter UTR"
                />
              </div>
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

export default AddSlip;
