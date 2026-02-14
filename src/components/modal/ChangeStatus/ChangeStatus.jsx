import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  useDownLineEditMutation,
  useDownLineEditQuery,
} from "../../../hooks/downLineEdit";
import GoCheckbox from "../../shared/form/GoCheckbox";
import { useLocation } from "react-router-dom";

const ChangeStatus = ({ modal, setModal, refetch }) => {
  const location = useLocation();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal(null));
  };
  const payload = {
    type: "getStatus",
    role: modal?.role,
    id: modal.id,
    downlineId: modal?.username,
  };
  const {
    mutate: downLineEdit,
    isPending,
    isSuccess,
  } = useDownLineEditMutation();
  const { data } = useDownLineEditQuery(payload);

  const onSubmit = async ({
    userStatus,
    bettingStatus,
    registrationStatus,
  }) => {
    const payload = {
      type: "changeStatus",
      role: modal?.role,
      id: modal.id,
      downlineId: modal?.username,
      userStatus: userStatus ? 1 : 0,
      bettingStatus: bettingStatus ? 1 : 0,
      registrationStatus: registrationStatus ? 1 : 0,
    };

    downLineEdit(payload, {
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

  if (!data?.result) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Change Status</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <GoCheckbox
                defaultChecked={data?.result?.userStatus === 1}
                label="User Status"
                type={"checkbox"}
                name="userStatus"
              />
              <GoCheckbox
                defaultChecked={data?.result?.bettingStatus === 1}
                label="Betting Status"
                type={"checkbox"}
                name="bettingStatus"
              />
              {location.pathname !== "/clients-with-balance" &&
                location.pathname !== "/view-clients" && (
                  <GoCheckbox
                    defaultChecked={modal?.registrationStatus === 1}
                    label="Registration Status"
                    type={"checkbox"}
                    name="registrationStatus"
                  />
                )}
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Save changes"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default ChangeStatus;
