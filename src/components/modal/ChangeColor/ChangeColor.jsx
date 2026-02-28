import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  useDownLineEditMutation,
  useDownLineEditQuery,
} from "../../../hooks/downLineEdit";

import { useEffect, useState } from "react";

const ChangeColor = ({ modal, setModal, refetchClient }) => {
  const [color, setColor] = useState(null);
  const methods = useForm();
  const { handleSubmit } = methods;

  const closeModal = () => {
    setModal(null);
  };

  const payload = {
    type: "getColor",
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
      type: "changeColor",
      role: modal?.role,
      id: modal.id,
      downlineId: modal?.username,

      color: color,
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
    if (data?.result?.color || data?.result?.color === 0) {
      setColor(data?.result?.color);
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
              <span> Change Color</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              {[
                { label: "White", value: 0 },
                { label: "Green", value: 1 },
                { label: "Red", value: 2 },
                { label: "Yellow", value: 3 },
                { label: "Blue", value: 4 },
              ].map(({ label, value }) => (
                <label
                  key={value}
                  style={{
                    display: "flex",
                    width: "fit-content",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    value={value}
                    checked={color === value}
                    style={{ width: "fit-content" }}
                    type="radio"
                    onChange={(e) => setColor(Number(e.target.value))}
                  />
                  {label}
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

export default ChangeColor;
