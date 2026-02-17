import { useSettledBetsQuery } from "../../../hooks/settledBets";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const SettleBets = ({ searchUser, marketId, setShowBetsModal }) => {
  const closeModal = () => {
    setShowBetsModal(null);
  };

  const { data } = useSettledBetsQuery({
    searchId: searchUser,
    marketId: marketId,
  });

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <form className="change-password-modal">
          {/* Modal Header */}
          <div className="modal-header">
            <span>Settle Bets</span>
            <span onClick={closeModal} className="close-icon">
              ✕
            </span>
          </div>
          {/* Modal Body */}
          <div className="modal-body">{JSON.stringify(data)}</div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default SettleBets;
