import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import {
  useWhiteLabelMutation,
  useWhiteLabelQuery,
} from "../../hooks/whiteLabel";
import GoRadio from "../../components/shared/form/GoRadio";

const UpdateWhiteLabel = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const whitelabel_id = params.get("whitelabel_id");
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const navigate = useNavigate();
  const { data } = useWhiteLabelQuery({
    type: "viewWhitelabelByID",
    whitelable_id: whitelabel_id,
  });
  const {
    mutate: handleUpdate,
    isPending,
    isSuccess,
  } = useWhiteLabelMutation();

  const onSubmit = async (values) => {
    if (values?.password !== values?.confirm_password) {
      return toast.error("Password did not matched!");
    }
    const payload = {
      type: "updateWhitelabel",
      whitelable_id: whitelabel_id,
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

    handleUpdate(payload, {
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

  useEffect(() => {
    if (data?.result) {
      reset({ ...data.result });
    }
  }, [data]);

  if (!data?.result) return;

  const SETTINGS_OPTIONS = [
    {
      label: "Logo Format",
      key: "logo_format",
      options: [
        {
          label: "PNG",
          value: "png",
          checked: data?.result?.logo_format === "png",
        },
        {
          label: "SVG",
          value: "svg",
          checked: data?.result?.logo_format === "svg",
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
          checked: data?.result?.casino_currency === "INR",
        },
        {
          label: "AED",
          value: "AED",
          checked: data?.result?.casino_currency === "AED",
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
          checked: data?.result?.currency === "INR",
        },
        {
          label: "AED",
          value: "AED",
          checked: data?.result?.currency === "AED",
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
          checked: data?.result?.change_password,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.change_password,
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
          checked: data?.result?.referral,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.referral,
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
          checked: data?.result?.referral_create_account,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.referral_create_account,
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
          checked: data?.result?.demo_login,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.demo_login,
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
          checked: data?.result?.deposit,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.deposit,
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
          checked: data?.result?.withdraw,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.withdraw,
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
          checked: data?.result?.registration,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.registration,
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
          checked: data?.result?.registration_whatsapp,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.registration_whatsapp,
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
          checked: data?.result?.cashout,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.cashout,
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
          checked: data?.result?.force_login,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.force_login,
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
          checked: data?.result?.b2c,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.b2c,
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
          checked: data?.result?.language,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.language,
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
          checked: data?.result?.otp,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.otp,
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
          checked: data?.result?.complaint,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.complaint,
        },
      ],
    },
  ];

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Update white Label" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            <GoInput
              label="Site Name"
              name="site_name"
              placeholder="Enter Site Name"
            />

            <GoInput
              label="Owner Name"
              name="owner_name"
              placeholder="Enter Owner Name"
            />

            <GoInput
              label="Minimum Deposit"
              name="minimum_deposit"
              type="number"
              placeholder="Enter Minimum Deposit"
            />
            <GoInput
              label="Minimum Withdraw"
              name="minimum_withdraw"
              type="number"
              placeholder="Enter Minimum Withdraw"
            />
            <GoInput label="Theme" name="theme" placeholder="Enter Theme" />
            <GoInput label="Cloud Front" name="cloudfront" />
            <GoInput label="APK Link" name="apk_link" />

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

export default UpdateWhiteLabel;
