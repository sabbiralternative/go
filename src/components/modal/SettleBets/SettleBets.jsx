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
          <div className="modal-body">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nation</th>
                    <th>Rate</th>
                    <th>Bhav</th>
                    <th>Amount</th>
                    <th>Win</th>
                    <th>Date</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.result?.map((betData, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${
                          betData?.betType === "Back" ? "BACK" : "LAY"
                        }`}
                      >
                        <td style={{ color: "black" }}> {betData?.nation}</td>
                        <td style={{ color: "black" }}> {betData?.userRate}</td>
                        <td style={{ color: "black" }}> {betData?.bhav}</td>
                        <td style={{ color: "black" }}>{betData?.amount}</td>
                        <td
                          className={`${
                            betData?.win > 0 ? "text-green" : "text-red"
                          }`}
                        >
                          {betData?.win}
                        </td>

                        <td style={{ color: "black" }}>{betData?.placeDate}</td>
                        <td style={{ color: "black" }}>{betData?.ipAddress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default SettleBets;
