import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterPanelMutation } from "../../hooks/registerPanel";
import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWhiteLabelQuery } from "../../hooks/whiteLabel";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import GoSelect from "../../components/shared/form/GoSelect";

const AddClient = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data } = useWhiteLabelQuery({
    type: "viewWhitelabelByBranch",
  });
  const {
    mutate: registerPanel,
    isPending,
    isSuccess,
  } = useRegisterPanelMutation();

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    registerPanel(values, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success("Client added successfully");
          reset();
          navigate("/view-clients");
        } else {
          toast.error(data?.error?.description);
        }
      },
    });
  };
  const siteData = data?.result?.map((item) => ({
    label: item?.site_url,
    key: item?.site_url,
  }));
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add Client" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoSelect
              data={siteData}
              label="Site"
              name="site"
              required
              placeholder="Select Site"
            />
            <GoInput
              label="Username"
              name="username"
              required
              placeholder="Enter User Name"
            />
            <GoInput
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Enter Password"
            >
              <i
                style={{ position: "absolute", right: "100px", top: "25px" }}
                onClick={() => setShowPassword((prev) => !prev)}
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              />
              <button
                type="button"
                onClick={() => reset({ password: "Abcd1234" })}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "0px",
                  width: "fit-content",
                }}
                className="btn"
              >
                Default Password
              </button>
            </GoInput>

            <GoInput
              label="Mobile"
              name="mobile"
              required
              placeholder="Enter Mobile Number"
            />
            <GoInput
              label="Remark"
              name="remark"
              required
              placeholder="Enter Remark"
            />
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
              {isPending && !isSuccess ? "Loading..." : "Add Client"}
            </button>
          </GoForm>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default AddClient;
