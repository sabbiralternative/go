import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import GoInput from "../../shared/form/GoInput";
import { FormProvider, useForm } from "react-hook-form";
import { Fragment, useEffect } from "react";
import GoSelect from "../../shared/form/GoSelect";
import { useWhiteLabelQuery } from "../../../hooks/whiteLabel";
import {
  useSocialLinkMutation,
  useSocialLinkQuery,
} from "../../../hooks/socialLink";
import { AdminRole } from "../../../constant/constant";
import { setShowSocialLinkModal } from "../../../redux/features/global/globalSlice";

const UpdateSocialLink = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: branches } = useWhiteLabelQuery({
    type: "viewWhitelabelByAdmin",
  });

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  const site = watch("site");

  const { data: socialLinks, refetch } = useSocialLinkQuery({ site });
  const {
    mutate: updateSocialLink,
    isSuccess,
    isPending,
  } = useSocialLinkMutation();

  const closeModal = () => {
    dispatch(setShowSocialLinkModal(null));
  };

  const onSubmit = async ({ whatsapp, instagram, telegram, site, pixel }) => {
    let payload = {};

    if (adminRole === "master") {
      payload = {
        type: "updateSocial",
        whatsapp,
      };
    } else {
      payload = {
        type: "updateSocial",
        whatsapp,
        instagram,
        telegram,
        site,
        pixel,
      };
    }

    updateSocialLink(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          refetch();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  const siteData = branches?.result?.map((item) => ({
    label: item?.site_url,
    key: item?.site_url,
  }));

  useEffect(() => {
    if (socialLinks?.length > 0) {
      reset({
        instagram: socialLinks?.result?.[0]?.instagram,
        pixel: socialLinks?.result?.[0]?.pixel,
        telegram: socialLinks?.result?.[0]?.telegram,
        whatsapp: socialLinks?.result?.[0]?.whatsapp,
        site,
      });
    }
  }, [socialLinks, reset, site]);

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Social Links</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
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
                label="Whatsapp"
                name="whatsapp"
                required
                placeholder="Enter Whatsapp"
              />
              {adminRole !== AdminRole.master && (
                <Fragment>
                  <GoInput
                    label="Instagram"
                    name="instagram"
                    required
                    placeholder="Enter Instagram"
                  />
                  <GoInput
                    label="Meta Pixel"
                    name="pixel"
                    required
                    placeholder="Enter Meta Pixel"
                  />
                  <GoInput
                    label="Telegram"
                    name="telegram"
                    required
                    placeholder="Enter Telegram"
                  />
                </Fragment>
              )}
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isSubmitting ? "Loading..." : "Update"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default UpdateSocialLink;
