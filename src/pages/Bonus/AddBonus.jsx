import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import { useBonusMutation } from "../../hooks/bonus";
import GoRadio from "../../components/shared/form/GoRadio";
import { useSelector } from "react-redux";
import { AdminRole } from "../../constant/constant";

const AddBonus = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { mutate: addBonus, isPending, isSuccess } = useBonusMutation();

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    const payload = {
      type: "addBonus",
      ...values,
    };
    addBonus(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success("Bonus added successfully");
          reset();
          navigate("/view-bonus");
        } else {
          toast.error(data?.error?.description);
        }
      },
    });
  };

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add Bonus" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoInput
              label="Bonus Name"
              name="bonus_name"
              required
              placeholder="Enter Bonus Name"
            />

            <div>
              <label>Bonus Method</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                }}
              >
                <GoRadio
                  label="Deposit Bonus"
                  name="bonus_type"
                  value="deposit"
                />
                {adminRole !== AdminRole.hyper_master && (
                  <GoRadio
                    label="First Deposit Bonus"
                    name="bonus_type"
                    value="first_deposit"
                  />
                )}
                <GoRadio
                  label="Registration Bonus"
                  name="bonus_type"
                  value="registration"
                />
              </div>
            </div>

            <GoInput
              label="Bonus Amount"
              name="bonus_amount"
              type="number"
              required
              placeholder="Enter Bonus Amount"
            />

            <div>
              <label>Bonus Amount Type</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                }}
              >
                <GoRadio
                  label="Percentage"
                  name="bonus_amount_type"
                  value="percentage"
                />

                <GoRadio
                  label="Fixed Amount"
                  name="bonus_amount_type"
                  value="fixed_amount"
                />
              </div>
            </div>

            <GoInput
              label="Bonus Expiry (In days)"
              name="bonus_expiry_days"
              type="number"
              required
              placeholder="Enter Bonus Expiry"
            />
            {adminRole === AdminRole.hyper_master && (
              <GoInput
                label="Number Of Usage"
                name="no_of_use"
                type="number"
                required
                placeholder="Enter Number Of Usage"
              />
            )}
            <div>
              <label>Bonus Status</label>
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
              label="Min. Deposit amount"
              name="minimum_deposit"
              required
              placeholder="Enter Min. Deposit amount"
            />
            <GoInput
              label="Max Bonus Amount"
              name="bonus_max_amount"
              required
              placeholder="Enter Max Bonus Amount"
            />
            <GoInput
              label="Wagering Multiplier"
              name="wagering_multiplier"
              required
              placeholder="Enter Wagering Multiplier"
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

export default AddBonus;
