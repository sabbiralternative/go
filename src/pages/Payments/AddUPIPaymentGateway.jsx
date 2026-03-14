import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import { usePaymentMutation } from "../../hooks/payments";
import { classifications } from "../../static/classification";
import GoCheckbox from "../../components/shared/form/GoCheckbox";
import { FaRegCopy } from "react-icons/fa";
const AddUPIPaymentGateway = () => {
  const { mutateAsync, isSuccess, isPending } = usePaymentMutation();
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  /* handle add bank */
  const onSubmit = async (values) => {
    const payload = {
      type: "addPayment",
      ...values,
      method: "upigateway",
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
  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Fragment>
      {/* Header */}
      <PageHeader
        title="Add UPI Payment
        Gateway"
      />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <div style={{ position: "relative" }}>
              <label>Webhook URL</label>
              <p
                style={{
                  fontSize: "9px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {" "}
                https://api7.live/api/payment_gateway/upigateway/callback{" "}
                <a
                  title="Copy Link"
                  style={{
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleCopy(
                      "https://api7.live/api/payment_gateway/upigateway/callback",
                    );
                  }}
                  className="btn btn-icon btn-success btn-sm"
                >
                  <FaRegCopy size={15} />
                </a>
              </p>
            </div>
            <GoInput
              label="Title"
              name="title"
              required
              placeholder="Enter Title"
            />

            <GoInput
              label="API Key"
              name="api_key"
              required
              placeholder="Enter API Key"
            />

            <GoInput
              label="Minimum Deposit"
              name="min_amount"
              required
              type="number"
              placeholder="Enter Minimum Deposit"
            />
            <GoInput
              label="Maximum Deposit"
              name="max_amount"
              required
              type="number"
              placeholder="Enter Maximum Deposit"
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

export default AddUPIPaymentGateway;
