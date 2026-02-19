import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWhiteLabelQuery } from "../../hooks/whiteLabel";
import GoForm from "../../components/shared/form/GoForm";
import GoInput from "../../components/shared/form/GoInput";
import GoSelect from "../../components/shared/form/GoSelect";
import { useSelector } from "react-redux";
import { AdminRole } from "../../constant/constant";
import { useGetIndexMutation } from "../../hooks";

const AddNotification = () => {
  const { adminRole } = useSelector((state) => state.auth);

  const { data } = useWhiteLabelQuery({
    type: "viewWhitelabelByBranch",
  });

  const {
    mutate: addNotification,
    isPending,
    isSuccess,
  } = useGetIndexMutation();

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = async (fieldValues) => {
    const payload = {
      ...fieldValues,
      type: "addNotification",
    };
    addNotification(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          navigate("/view-notification");
        } else {
          toast.error(data?.error?.status?.[0]?.description);
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
      <PageHeader title="Add Notification" />

      <div className="client-card">
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {adminRole === AdminRole.hyper_master && (
              <GoSelect
                data={siteData}
                label="Site"
                name="site"
                required
                placeholder="Select Site"
              />
            )}

            <GoInput
              label="Notification Text"
              name="notification_text"
              required
              placeholder="Enter Notification Text"
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

export default AddNotification;
