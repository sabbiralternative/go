import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import { usePaymentMutation } from "../../hooks/payments";
import { classifications } from "../../static/classification";
import GoCheckbox from "../../components/shared/form/GoCheckbox";
import { useUploadScreenShot } from "../../hooks/uploadScreenshot";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AddQR = () => {
  const { mutateAsync, isSuccess, isPending } = usePaymentMutation();
  const navigate = useNavigate();
  const { mutate: uploadScreenShot } = useUploadScreenShot();
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qr_code, setQr_code] = useState("");

  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "payment",
        };
        formData.append("data", JSON.stringify(payload));

        uploadScreenShot(formData, {
          onSuccess: (uploadData) => {
            setLoading(false);
            if (uploadData?.success) {
              setQr_code(uploadData?.filePath);
            }
          },
        });
      };
      handleSubmitImage();
    }
  }, [image, uploadScreenShot]);

  /* handle add bank */
  const onSubmit = async (values) => {
    const payload = {
      type: "addPayment",
      ...values,
      method: "qr",
    };

    const data = await mutateAsync(payload);
    if (data?.success) {
      toast.success(data?.result?.message);
      reset();
      navigate("/view-payment-method");
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add New QR" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoInput
              label="Title"
              name="title"
              required
              placeholder="Enter Title"
            />
            {!loading && !qr_code && (
              <div style={{ position: "relative" }}>
                <label> QR Code</label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </div>
            )}
            {!qr_code && loading && (
              <div style={{ position: "relative" }}>
                <label> QR Code</label>
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
            {qr_code && !loading && (
              <div style={{ position: "relative" }}>
                <label> QR Code</label>
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
                    src={qr_code}
                    alt=""
                  />
                  <RxCross2
                    onClick={() => setQr_code("")}
                    cursor="pointer"
                    size={20}
                  />
                </div>
              </div>
            )}
            <GoInput
              label="Minimum Deposit Amount"
              name="min_amount"
              required
              type="number"
              placeholder="Enter Minimum Deposit Amount"
            />
            <GoInput
              label="Maximum Deposit Amount"
              name="max_amount"
              required
              type="number"
              placeholder="Enter Maximum Deposit Amount"
            />

            <GoInput
              label="Sort"
              name="sort"
              required
              type="number"
              placeholder="Enter Sort"
            />
            <div style={{ position: "relative" }}>
              <label> Client Level</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0px 15px",
                  marginTop: "10px",
                }}
              >
                {classifications.map((item) => (
                  <GoCheckbox
                    key={item.label}
                    label="Client Level"
                    name="level"
                    type="checkbox"
                  />
                ))}
              </div>
            </div>
            <GoInput
              label="Transaction Code"
              name="transaction_code"
              required
              placeholder="Enter Transaction Code"
            />
            <button
              disabled={isPending && !isSuccess}
              type="submit"
              className="save-btn"
            >
              {isPending && !isSuccess ? "Loading..." : "Submit"}
            </button>
          </GoForm>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default AddQR;
