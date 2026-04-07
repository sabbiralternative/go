import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fragment, useRef } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import GoRadio from "../../components/shared/form/GoRadio";
import GoSelect from "../../components/shared/form/GoSelect";
import { useBonusMutation } from "../../hooks/bonus";
import { useSelector } from "react-redux";
import { useWhiteLabelQuery } from "../../hooks/whiteLabel";
import { FaCopy } from "react-icons/fa";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { AdminRole } from "../../constant/constant";

const AddCoupon = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { data } = useWhiteLabelQuery({
    type: "viewWhitelabelByAdmin",
  });

  const ref = useRef("");

  const { mutateAsync: handleBonus, isPending, isSuccess } = useBonusMutation();
  const navigate = useNavigate();
  const methods = useForm();
  const { register, handleSubmit, reset, getValues } = methods;

  const onSubmit = async (value) => {
    const payload = {
      type: "addCoupon",
      ...value,
    };

    const data = await handleBonus(payload);
    if (data?.success) {
      toast.success(data?.result?.message);
      reset();
      navigate("/view-coupons");
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  const generateCoupon = async () => {
    const data = await handleBonus({ type: "generateCoupon" });
    if (data?.success) {
      reset({ coupon_code: data?.result?.code });
    }
  };

  const siteData = data?.result?.map((item) => ({
    label: item?.site_url,
    key: item?.site_url,
  }));

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add Coupon" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoInput
              readOnly
              label="Coupon Code"
              name="coupon_code"
              required
              placeholder="Generate Coupon Code"
            >
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 5px",
                }}
              >
                <button
                  onClick={generateCoupon}
                  className="btn btn-primary btn-sm"
                  type="button"
                >
                  Generate Coupon
                </button>
                <button
                  style={{ width: "40px" }}
                  onClick={() =>
                    handleCopyToClipBoard(getValues("coupon_code"))
                  }
                  disabled={!getValues("coupon_code")}
                  className="btn  btn-sm btn-success"
                >
                  <FaCopy />
                </button>
              </div>
            </GoInput>
            {(adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.admin_staff) && (
              <GoSelect
                data={siteData}
                label="Site"
                name="site"
                required
                placeholder="Select Site"
              />
            )}

            <div style={{ position: "relative" }}>
              <label>Amount</label>
              <input
                type="number"
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    ref.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1) {
                    ref.current = raw;
                  } else {
                    e.target.value = ref.current;
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
                {...register("bonus_amount", {
                  required: true,
                  min: {
                    value: 1,
                  },
                  valueAsNumber: true,
                })}
              />
            </div>

            <div style={{ position: "relative" }}>
              <label>Usage Limit</label>
              <input
                type="number"
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    ref.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1) {
                    ref.current = raw;
                  } else {
                    e.target.value = ref.current;
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
                {...register("usage_limit", {
                  required: true,
                  min: {
                    value: 1,
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
            <div style={{ position: "relative" }}>
              <label>Coupon Expiry Days</label>
              <input
                type="number"
                min={1}
                step={1}
                onInput={(e) => {
                  const raw = e.target.value;

                  if (raw === "") {
                    ref.current = "";
                    return;
                  }

                  const value = Number(raw);

                  if (value >= 1) {
                    ref.current = raw;
                  } else {
                    e.target.value = ref.current;
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
                {...register("coupon_expiry_days", {
                  required: true,
                  min: {
                    value: 1,
                  },
                  valueAsNumber: true,
                })}
              />
            </div>

            <div>
              <label>Status</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                }}
              >
                <GoRadio label="Active" name="status" value="1" />
                <GoRadio label="Inactive" name="status" value="0" />
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

export default AddCoupon;
