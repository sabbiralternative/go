import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  useDownLineEditMutation,
  useDownLineEditQuery,
} from "../../../hooks/downLineEdit";

import { useEffect, useState } from "react";

const ChangeBranch = ({ modal, setModal, refetchClient }) => {
  const [activeBranchId, setActiveBranchId] = useState(null);
  const methods = useForm();
  const { handleSubmit } = methods;

  const closeModal = () => {
    setModal(null);
  };

  const payload = {
    type: "viewBranches",
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

  const onSubmit = async () => {
    const payload = {
      type: "changeBranch",
      role: modal?.role,
      id: modal.id,
      downlineId: modal?.username,
      branch_id: activeBranchId,
    };

    downLineEdit(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);

          refetchClient();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  useEffect(() => {
    if (data?.result?.branch?.length > 0) {
      const findActive = data?.result?.branch?.find((br) => br?.active);
      setActiveBranchId(findActive?.branch_id);
    }
  }, [data]);

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
              <span>Change Branch</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              {data?.result?.branch?.map((item) => (
                <label
                  key={item?.branch_id}
                  style={{
                    display: "flex",
                    width: "fit-content",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    checked={activeBranchId === item?.branch_id}
                    style={{ width: "fit-content" }}
                    type="radio"
                    onChange={() => setActiveBranchId(item?.branch_id)}
                  />
                  {item?.branch_name}
                </label>
              ))}
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

export default ChangeBranch;
