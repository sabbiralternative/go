import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { API } from "../../../../api";
import { useSelector } from "react-redux";

const AddTheme = ({ modal, setModal, refetch }) => {
  const [disabled, setDisabled] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const closeModal = () => {
    setModal({
      name: "",
      site: "",
    });
  };

  const onSubmit = async () => {
    setDisabled(true);
    const payload = {
      site: modal.site,
      file_type: "theme",
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(payload));

    const res = await axios.post(API.upload_assets, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.message);
      reset();
      refetch();
      setModal({
        name: "",
        site: "",
      });
    } else {
      setDisabled(false);
      toast.error(data?.error);
    }
  };

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span> Add Theme {modal.site}</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div style={{ position: "relative" }}>
                <label> Theme</label>
                <input
                  readOnly
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  placeholder="Slip"
                  accept=".svg,.png,.css"
                />
              </div>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={disabled || !image}
                type="submit"
                className="save-btn"
              >
                {disabled ? "Loading..." : "Submit"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default AddTheme;
