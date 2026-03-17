import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useMemo } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import { useWhiteLabelMutation } from "../../hooks/whiteLabel";
import GoRadio from "../../components/shared/form/GoRadio";
import GoSelect from "../../components/shared/form/GoSelect";

const AddWhiteLabel = () => {
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;
  const navigate = useNavigate();
  const { mutate, data, isPending, isSuccess } = useWhiteLabelMutation();

  const admin = watch("admin");

  const onSubmit = async (values) => {
    if (values?.password !== values?.confirm_password) {
      return toast.error("Password did not matched!");
    }

    const payload = {
      type: "addWhitelabel",
      ...values,
      minimum_deposit: Number(values?.minimum_deposit),
      minimum_withdraw: Number(values?.minimum_withdraw),
      change_password: Number(values?.change_password),
      referral: Number(values?.referral),
      referral_create_account: Number(values?.referral_create_account),
      demo_login: Number(values?.demo_login),
      deposit: Number(values?.deposit),
      withdraw: Number(values?.withdraw),
      registration: Number(values?.registration),
      force_login: Number(values?.force_login),
      b2c: Number(values?.b2c),
      language: Number(values?.language),
      otp: Number(values?.otp),
      complaint: Number(values?.complaint),
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result);
          reset();
          navigate("/view-whitelable");
        } else {
          toast.error(data?.error);
        }
      },
    });
  };
  const SETTINGS_OPTIONS = [
    {
      label: "Logo Format",
      key: "logo_format",
      options: [
        {
          label: "PNG",
          value: "png",
          checked: true,
        },
        {
          label: "SVG",
          value: "svg",
          checked: false,
        },
      ],
    },
    {
      label: "Casino Currency",
      key: "casino_currency",
      options: [
        {
          label: "INR",
          value: "INR",
          checked: true,
        },
        {
          label: "AED",
          value: "AED",
          checked: false,
        },
      ],
    },
    {
      label: "Currency",
      key: "currency",
      options: [
        {
          label: "INR",
          value: "INR",
          checked: true,
        },
        {
          label: "AED",
          value: "AED",
          checked: false,
        },
      ],
    },
    {
      label: "Change Password",
      key: "change_password",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
    {
      label: "Referral",
      key: "referral",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Referral Create Account",
      key: "referral_create_account",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Demo Login",
      key: "demo_login",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Deposit",
      key: "deposit",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Withdraw",
      key: "withdraw",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Registration",
      key: "registration",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Registration Whatsapp",
      key: "registration_whatsapp",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Cashout",
      key: "cashout",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Force Login",
      key: "force_login",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
    {
      label: "B2C",
      key: "b2c",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Language",
      key: "language",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "OTP",
      key: "otp",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Complaint",
      key: "complaint",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (admin === "existing") {
      mutate({ type: "viewAdmin" });
    }
  }, [admin, mutate]);

  const adminOptions = useMemo(() => {
    return data?.result?.map((item) => ({
      label: item?.loginname,
      key: item?.admin_id,
    }));
  }, [data?.result]);

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Add white Label" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoInput
              label="Site Name"
              name="site_name"
              required
              placeholder="Enter Site Name"
            />

            <GoInput
              label="Owner Name"
              name="owner_name"
              required
              placeholder="Enter Owner Name"
            />
            <GoInput
              label="Site URL"
              name="site_url"
              required
              placeholder="Enter Site URL"
            />
            <GoInput
              label="Live URL"
              name="live_url"
              required
              placeholder="Enter Live URL"
            />

            <div>
              <label>Admin</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 10px",
                }}
              >
                <GoRadio label="New Admin" name="admin" value="new" />

                <GoRadio label="Existing Admin" name="admin" value="existing" />
              </div>
            </div>

            {!admin || admin === "new" ? (
              <GoInput
                label="Admin Name"
                name="admin_name"
                required
                placeholder="Enter Admin Name"
              />
            ) : (
              <GoSelect
                name="admin_id"
                label="Admin Name"
                placeholder="Select Admin Name"
                required
                data={adminOptions}
              />
            )}

            {admin !== "existing" && (
              <Fragment>
                <GoInput
                  label="Password"
                  name="password"
                  required
                  placeholder="Enter Password"
                />
                <GoInput
                  label="Confirm Password"
                  name="confirm_password"
                  required
                  placeholder="Enter Confirm Password"
                />
              </Fragment>
            )}

            <GoInput
              label="Minimum Deposit"
              name="minimum_deposit"
              type="number"
              required
              placeholder="Enter Minimum Deposit"
            />
            <GoInput
              label="Minimum Withdraw"
              name="minimum_withdraw"
              type="number"
              required
              placeholder="Enter Minimum Withdraw"
            />
            <GoInput
              label="Theme"
              name="theme"
              required
              placeholder="Enter Theme"
            />
            <GoInput
              label="Cloud Front"
              name="cloudfront"
              required
              placeholder="Enter Cloud Front"
            />
            <GoInput
              label="Logo Height"
              name="logo_height"
              required
              placeholder="Enter Logo Height"
            />
            <GoInput
              label="Logo Width"
              name="logo_width"
              required
              placeholder="Enter Logo Width"
            />

            {SETTINGS_OPTIONS.map((item, index) => {
              return (
                <div key={index}>
                  <label> {item.label}</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px 10px",
                    }}
                  >
                    {item?.options?.map((option, idx) => (
                      <GoRadio
                        defaultChecked={option.checked}
                        key={idx}
                        label={option.label}
                        name={item.key}
                        required
                        value={option.value}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

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

export default AddWhiteLabel;
