import { useDispatch } from "react-redux";
import moment from "moment";
import { useState } from "react";
import { useBalanceQuery } from "../../../hooks/balance";
import { DatePicker } from "rsuite";

const DashboardBalance = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const payload = {
    date: moment(date).format("YYYY-MM-DD"),
    role: modal?.role,
    user_id: modal.id,
  };
  const { data: balanceData } = useBalanceQuery(payload);

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const disableOutsideLast14Days = (date) => {
    const start = new Date();
    start.setDate(today.getDate() - 14);
    return date < start || date > today;
  };

  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "black";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="change-password-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <span>Dashboard Balance</span>
          <span onClick={closeModal} className="close-icon">
            ✕
          </span>
        </div>
        {/* Modal Body */}
        <div className="modal-body">
          <DatePicker
            style={{
              width: "100%",
              maxWidth: "300px",
            }}
            format="dd-MM-yyyy"
            editable={false}
            value={date}
            onChange={setDate}
            disabledDate={disableOutsideLast14Days}
            block
          />
          <section
            className="summary"
            style={{ marginTop: "0px", padding: "0px" }}
          >
            <div
              className="summary-card"
              style={{ background: "#fff", padding: "0px", marginTop: "10px" }}
            >
              <div
                style={{
                  display: "block",
                  borderRadius: "8px",
                  backgroundColor: "#E7E7E7",
                  padding: "10px 15px",
                }}
              >
                <div>
                  <span>Upper Level</span>
                  <strong> {balanceData?.upperLevel}</strong>
                </div>
                <div>
                  <span>Total Client Balance</span>
                  <strong> {balanceData?.downLevelOccupyBalance}</strong>
                </div>
                <div>
                  <span>Available Balance</span>
                  <strong>
                    {balanceData?.availableBalance ||
                      (balanceData?.availableBalance == 0 &&
                        balanceData?.availableBalance?.toFixed(2))}
                  </strong>
                </div>
                <div>
                  <span>Total Master Balance</span>
                  <strong>{balanceData?.totalMasterBalance}</strong>
                </div>
                <div>
                  <span>New Users Today</span>
                  <strong>{balanceData?.usersToday}</strong>
                </div>
                <div>
                  <span>Total Deposit Today</span>
                  <strong> {balanceData?.depositToday}</strong>
                </div>
                <div>
                  <span>Total Withdraw Today</span>
                  <strong> {balanceData?.withdrawToday}</strong>
                </div>
                <div>
                  <span>P/L Today</span>
                  <strong
                    style={{
                      color: `${defineBalanceColor(balanceData?.pnlToday)}`,
                    }}
                  >
                    {" "}
                    {balanceData?.pnlToday}
                  </strong>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Modal Footer */}
        <div onClick={closeModal} className="modal-footer">
          <button type="submit" className="save-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
