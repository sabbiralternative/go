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

const AddTOITPaymentGateway = () => {
  const { mutateAsync, isSuccess, isPending } = usePaymentMutation();
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  /* handle add bank */
  const onSubmit = async (values) => {
    const payload = {
      type: "addPayment",
      ...values,
      method: "toitgateway",
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
      <PageHeader title="Add TOIT Payment Gateway" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
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
              label="Maximum Deposit Amount"
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
              placeholder="Enter Maximum Deposit"
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

export default AddTOITPaymentGateway;
