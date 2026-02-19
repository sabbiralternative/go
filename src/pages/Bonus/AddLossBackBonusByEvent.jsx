import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fragment, useRef } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import GoRadio from "../../components/shared/form/GoRadio";
import { useLossBackMutation } from "../../hooks/lossback";
import GoSelect from "../../components/shared/form/GoSelect";

const AddLossBackBonusByEvent = () => {
  const lastLossBackValue = useRef("");
  const minimumLossAmount = useRef("");
  const maximumBonusAmount = useRef("");
  const bonusExpiryDate = useRef("");
  const {
    mutate: addLossBackBonus,
    isPending,
    isSuccess,
  } = useLossBackMutation();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset, watch, register } = methods;
  const clients = watch("clients");
  const onSubmit = async (values) => {
    const payload = {
      type: "add_lossback_bonus",
      mode: "event",
      ...values,
    };

    addLossBackBonus(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          navigate("/view-lossback-bonus");
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };
  const marketOptions = [
    { label: "Match Odds", key: "matchodds" },
    { label: "Bookmaker", key: "bookmaker" },
    { label: "Mini Bookmaker", key: "minibookmaker" },
  ];
  const clientOption = [
    { label: "All Clients", key: "all" },
    { label: "Referral", key: "referral" },
    { label: "Individual Clients", key: "individual" },
  ];

  console.log(clients);
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add Loss Back Bonus By Event" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Visible On</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                }}
              >
                <GoRadio
                  label="Website and App"
                  name="visible_on"
                  value="all"
                />

                <GoRadio label="App Only" name="visible_on" value="app" />
              </div>
            </div>
            <GoInput
              label="Event Id"
              name="event_id"
              required
              placeholder="Enter Event Id"
            />

            <GoSelect
              label="Market Name"
              name="market_name"
              data={marketOptions}
              required
              placeholder="Select Market Name"
            />
            <GoSelect
              label="Clients"
              name="clients"
              data={clientOption}
              required
              placeholder="Select Clients"
            />
            {clients === "referral" && (
              <GoInput
                label="Referral Id"
                name="downline_id"
                required={clients === "referral" ? true : false}
                placeholder="Enter Referral Id"
              />
            )}
            {clients === "individual" && (
              <GoInput
                label="Client Id"
                name="downline_id"
                required={clients === "individual" ? true : false}
                placeholder="Enter Client Id"
              />
            )}
            <div style={{ position: "relative" }}>
              <label>Lossback (%)</label>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    lastLossBackValue.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1 && value <= 100) {
                    lastLossBackValue.current = raw;
                  } else {
                    e.target.value = lastLossBackValue.current;
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "." ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register("lossback", {
                  required: "Lossback is required",
                  min: {
                    value: 1,
                    message: "Minimum value is 1",
                  },
                  max: {
                    value: 100,
                    message: "Maximum value is 100",
                  },
                  valueAsNumber: true,
                  validate: (v) =>
                    (v >= 1 && v <= 100) || "Value must be between 1 and 100",
                })}
              />
            </div>

            <div style={{ position: "relative" }}>
              <label>Minimum Loss Amount</label>
              <input
                type="number"
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    minimumLossAmount.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1) {
                    minimumLossAmount.current = raw;
                  } else {
                    e.target.value = minimumLossAmount.current;
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "." ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register("loss_amount", {
                  required: true,
                  min: {
                    value: 1,
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
            <div style={{ position: "relative" }}>
              <label>Maximum Bonus Amount</label>
              <input
                type="number"
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    maximumBonusAmount.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1) {
                    maximumBonusAmount.current = raw;
                  } else {
                    e.target.value = maximumBonusAmount.current;
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "." ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register("maximum_bonus_amount", {
                  required: true,
                  min: {
                    value: 1,
                  },

                  valueAsNumber: true,
                })}
              />
            </div>
            <div style={{ position: "relative" }}>
              <label>Bonus Expiry (No. of days)</label>
              <input
                type="number"
                max={14}
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    bonusExpiryDate.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1 && value <= 14) {
                    bonusExpiryDate.current = raw;
                  } else {
                    e.target.value = bonusExpiryDate.current;
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "." ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register("bonus_expiry_date", {
                  required: true,
                  min: {
                    value: 1,
                  },
                  max: {
                    value: 14,
                  },
                  valueAsNumber: true,
                })}
              />
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

export default AddLossBackBonusByEvent;
