import { useGetIndexQuery } from "../../../hooks";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const DepositReport = ({ modal, setModal }) => {
  const closeModal = () => {
    setModal(null);
  };

  const { data } = useGetIndexQuery({
    downlineId: modal?.downlineId,
    type: "viewDepositReport",
  });

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <form className="change-password-modal">
          {/* Modal Header */}
          <div className="modal-header">
            <span>Deposit Report</span>
            <span onClick={closeModal} className="close-icon">
              ✕
            </span>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            {" "}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Bank Account Name</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.result?.length > 0 &&
                    data?.result?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item?.bank_name}</td>
                          <td>{item?.account_number}</td>
                          <td>{item?.amount}</td>
                          <td>{item?.date}</td>
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

export default DepositReport;
