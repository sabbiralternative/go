import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWhiteLabelQuery } from "../../hooks/whiteLabel";
import GoForm from "../../components/shared/form/GoForm";
import GoSelect from "../../components/shared/form/GoSelect";
import { useUploadScreenShot } from "../../hooks/uploadScreenshot";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useBannerMutation } from "../../hooks/banner";
import { useSelector } from "react-redux";
import { AdminRole } from "../../constant/constant";

const AddLoginBanner = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const [filePath, setFilePath] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data } = useWhiteLabelQuery({
    type: "viewWhitelabelByBranch",
  });

  const { mutate: uploadImage } = useUploadScreenShot();
  const { mutate: bannerMutation, isPending, isSuccess } = useBannerMutation();

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;
  const site = watch("site");

  const onSubmit = async (fieldValues) => {
    const payload = {
      ...fieldValues,
      type: "addLoginBanner",
      banner_link: filePath,
    };
    bannerMutation(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          navigate("/view-banner");
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "banner",
        };
        formData.append("data", JSON.stringify(payload));
        uploadImage(formData, {
          onSuccess: (data) => {
            setLoading(false);
            if (data?.success) {
              setFilePath(data?.filePath);
            }
          },
        });
      };
      handleSubmitImage();
    }
  }, [image, uploadImage]);

  const handleDeleteCurrentImage = async () => {
    const payload = {
      type: "deleteLoginBanner",
      site: site || null,
    };
    bannerMutation(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
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
      <PageHeader title="Add Login Banner" />

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

            {!loading && !filePath && (
              <div style={{ position: "relative" }}>
                <label>Banner Image</label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </div>
            )}
            {loading && (
              <div style={{ position: "relative" }}>
                <label> Banner Image Uploading...</label>
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
            {!loading && filePath && (
              <div style={{ position: "relative" }}>
                <label>Banner Image</label>
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
                    src={filePath}
                    alt=""
                  />
                  <RxCross2
                    onClick={() => setFilePath("")}
                    cursor="pointer"
                    size={20}
                  />
                </div>
              </div>
            )}

            <button
              disabled={isPending && !isSuccess}
              type="submit"
              className="save-btn"
            >
              {isPending && !isSuccess ? "Loading..." : "Add Banner"}
            </button>
            <button
              disabled={isPending && !isSuccess}
              onClick={handleDeleteCurrentImage}
              type="button"
              className="save-btn"
            >
              {isPending && !isSuccess
                ? "Deleting..."
                : "Delete Current Login Banner"}
            </button>
          </GoForm>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default AddLoginBanner;
