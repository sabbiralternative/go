import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { usePaymentMutation, usePaymentQuery } from "../../../hooks/payments";
import { Fragment, useEffect, useState } from "react";
import { useUploadScreenShot } from "../../../hooks/uploadScreenshot";
import GoSelect from "../../shared/form/GoSelect";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditPayment = ({ modal, setModal, refetch }) => {
  const payload = {
    paymentId: modal?.id,
    type: "ViewPaymentStatus",
  };
  const { data: paymentStatus } = usePaymentQuery(payload);
  const [qr_code, setQr_code] = useState(paymentStatus?.result?.qr_code);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();
  const { mutate: updatePayment, isPending, isSuccess } = usePaymentMutation();
  const { mutate: uploadScreenshot } = useUploadScreenShot();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async (fieldValues) => {
    const payload = {
      type: "updatePayment",
      paymentId: modal,
      ...fieldValues,
      status: parseFloat(fieldValues?.status),
    };
    if (paymentStatus?.result?.type === "qr") {
      payload.qr_code = qr_code;
    }

    updatePayment(payload, {
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

  useEffect(() => {
    if (image) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      uploadScreenshot(formData, {
        onSuccess: (data) => {
          setLoading(false);
          if (data?.success) {
            setQr_code(data?.filePath);
          }
        },
      });
    }
  }, [image, uploadScreenshot]);

  useEffect(() => {
    if (paymentStatus?.result) {
      if (paymentStatus?.result?.type === "qr") {
        setQr_code(paymentStatus?.result?.qr_code);
        reset({
          title: paymentStatus?.result?.title,
          max_amount: paymentStatus?.result?.max_amount,
          min_amount: paymentStatus?.result?.min_amount,
          sort: paymentStatus?.result?.sort,
        });
      }
      if (paymentStatus?.result?.type === "bank") {
        reset({
          bank_name: paymentStatus?.result?.bank_name,
          ifsc: paymentStatus?.result?.ifsc,
          min_amount: paymentStatus?.result?.min_amount,
          max_amount: paymentStatus?.result?.max_amount,
          account_number: paymentStatus?.result?.account_number,
          bank_account_name: paymentStatus?.result?.bank_account_name,
          sort: paymentStatus?.result?.sort,
        });
      }
      if (paymentStatus?.result?.type === "upi") {
        reset({
          upi_id: paymentStatus?.result?.upi_id,
          upi_account_name: paymentStatus?.result?.upi_account_name,
          min_amount: paymentStatus?.result?.min_amount,
          max_amount: paymentStatus?.result?.max_amount,
          sort: paymentStatus?.result?.sort,
        });
      }
      if (
        paymentStatus?.result?.type === "usdt" ||
        paymentStatus?.result?.type === "usdt_bep20"
      ) {
        reset({
          token_address: paymentStatus?.result?.token_address,
          usdt_value: paymentStatus?.result?.usdt_value,
          min_amount: paymentStatus?.result?.min_amount,
          max_amount: paymentStatus?.result?.max_amount,
          sort: paymentStatus?.result?.sort,
        });
      }
      if (paymentStatus?.result?.type === "whatsapp") {
        reset({
          account_number: paymentStatus?.result?.account_number,
          min_amount: paymentStatus?.result?.min_amount,
          max_amount: paymentStatus?.result?.max_amount,
          transaction_code: paymentStatus?.result?.transaction_code,
          sort: paymentStatus?.result?.sort,
        });
      }
    }
  }, [paymentStatus?.result, reset]);

  if (!paymentStatus?.result) {
    return null;
  }

  const statusOptions = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 2 },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
  };

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Edit Payment</span>
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
                data={statusOptions}
                placeholder="Select Status"
                defaultValue={paymentStatus?.result?.status}
              />
              {paymentStatus?.result?.type === "qr" && (
                <Fragment>
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
                        onChange={(e) => handleImageChange(e)}
                        type="file"
                      />
                    </div>
                  )}
                  {loading && (
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
                  {!loading && qr_code && (
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
                    type="number"
                    label="Minimum Deposit Amount"
                    name="min_amount"
                    required
                    placeholder="Enter Minimum Deposit Amount"
                  />
                  <GoInput
                    type="number"
                    label="Maximum Deposit Amount"
                    name="max_amount"
                    required
                    placeholder="Enter Maximum Deposit Amount"
                  />
                  <GoInput
                    label="Sort"
                    name="sort"
                    required
                    placeholder="Enter Sort"
                  />
                </Fragment>
              )}
              {paymentStatus?.result?.type === "bank" && (
                <Fragment>
                  <GoInput
                    label="Bank Account Name"
                    name="bank_account_name"
                    required
                    placeholder="Enter Bank Account Name"
                  />
                  <GoInput
                    label="Account Number"
                    name="bank_account_number"
                    required
                    placeholder="Enter Account Number"
                  />
                  <GoInput
                    label="IFSC"
                    name="bank_ifsc"
                    required
                    placeholder="Enter IFSC"
                  />
                  <GoInput
                    label="Bank Name"
                    name="bank_name"
                    required
                    placeholder="Enter Bank Name"
                  />
                  <GoInput
                    label="Minimum Deposit Amount"
                    name="min_amount"
                    type="number"
                    required
                    placeholder="Enter Minimum Deposit Amount"
                  />
                  <GoInput
                    label="Maximum Deposit Amount"
                    name="max_amount"
                    type="number"
                    required
                    placeholder="Enter Maximum Deposit Amount"
                  />
                  <GoInput
                    label="Sort"
                    name="sort"
                    required
                    placeholder="Enter Sort"
                  />
                </Fragment>
              )}
              {paymentStatus?.result?.type === "upi" && (
                <Fragment>
                  <GoInput
                    label="UPI ID"
                    name="upi_id"
                    required
                    placeholder="Enter UPI ID"
                  />
                  <GoInput
                    label="UPI Account Name"
                    name="upi_account_name"
                    required
                    placeholder="Enter UPI Account Name"
                  />
                  <GoInput
                    label="Minimum Deposit Amount"
                    name="min_amount"
                    type="number"
                    required
                    placeholder="Enter Minimum Deposit Amount"
                  />
                  <GoInput
                    label="Maximum Deposit Amount"
                    name="max_amount"
                    type="number"
                    required
                    placeholder="Enter Maximum Deposit Amount"
                  />
                  <GoInput
                    label="Sort"
                    name="sort"
                    type="number"
                    required
                    placeholder="Enter Sort"
                  />
                </Fragment>
              )}
              {(paymentStatus?.result?.type === "usdt" ||
                paymentStatus?.result?.type === "usdt_bep20") && (
                <Fragment>
                  <GoInput
                    label="Token Address"
                    name="token_address"
                    required
                    placeholder="Enter Token Address"
                  />
                  <GoInput
                    label="USDT Value"
                    name="usdt_value"
                    required
                    placeholder="Enter USDT Value"
                  />
                  <GoInput
                    label="Minimum Amount"
                    name="min_amount"
                    type="number"
                    required
                    placeholder="Enter Minimum Amount"
                  />
                  <GoInput
                    label="Maximum Amount"
                    name="max_amount"
                    type="number"
                    required
                    placeholder="Enter Maximum Amount"
                  />
                  <GoInput
                    label="Sort"
                    name="sort"
                    type="number"
                    required
                    placeholder="Enter Sort"
                  />
                </Fragment>
              )}
              {(paymentStatus?.result?.type === "usdt" ||
                paymentStatus?.result?.type === "usdt_bep20") && (
                <Fragment>
                  <GoInput
                    label="Whatsapp number (with +country code)"
                    name="account_number"
                    required
                    placeholder="Enter Whatsapp number"
                  />

                  <GoInput
                    label="Minimum Deposit Amount"
                    name="min_amount"
                    type="number"
                    required
                    placeholder="Enter Minimum Deposit Amount"
                  />

                  <GoInput
                    label="Sort"
                    name="sort"
                    type="number"
                    required
                    placeholder="Enter Sort"
                  />
                  <GoInput
                    label="Maximum Deposit Amount"
                    name="max_amount"
                    type="number"
                    required
                    placeholder="Enter Maximum Deposit Amount"
                  />
                </Fragment>
              )}
              <GoInput
                label="Transaction Code"
                name="transaction_code"
                required
                placeholder="Enter Transaction Code"
              />
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Update"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default EditPayment;
