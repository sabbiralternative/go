import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ImagePreview = ({ image, setImage }) => {
  const closeModal = () => {
    setImage(null);
  };

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <form className="change-password-modal">
          {/* Modal Header */}
          <div className="modal-header">
            <span>Image Preview</span>
            <span onClick={closeModal} className="close-icon">
              ✕
            </span>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            <div style={{ position: "relative" }}>
              <img
                style={{
                  height: "100%",
                  maxHeight: "400px",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={image}
                alt=""
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default ImagePreview;
