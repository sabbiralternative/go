import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { ModalNames } from "../../constant/constant";
import { useAdminQuery } from "../../hooks/admin";
import ClientDeposit from "../../components/modal/ClientDeposit/ClientDeposit";
import DirectWithdraw from "../../components/modal/DirectWithdraw/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword/ChangePassword";
import CreditReference from "../../components/modal/CreditReference/CreditReference";

const ViewAdmin = () => {
  const [modal, setModal] = useState({
    name: "",
    username: "",
    role: "",
    downlineId: "",
  });
  const { data, refetch } = useAdminQuery({
    type: "viewAdmin",
  });

  const handleOpenModal = (admin, name) => {
    setModal({
      name,
      downlineId: admin?.username,
      role: admin?.role,
      id: admin?.downlineId,
    });
  };

  return (
    <Fragment>
      {modal?.name === ModalNames.clientDeposit && (
        <ClientDeposit modal={modal} setModal={setModal} />
      )}
      {modal?.name === ModalNames.directWithdraw && (
        <DirectWithdraw
          modal={modal}
          setModal={setModal}
          refetchClient={refetch}
        />
      )}
      {modal?.name === ModalNames.changePassword && (
        <ChangePassword modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.creditReference && (
        <CreditReference modal={modal} setModal={setModal} refetch={refetch} />
      )}
      <PageHeader title="View Admin" />

      {/* Client Card */}
      {data?.result?.map((admin, index) => {
        return (
          <div key={index} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>

            <div className="row">
              <span>Username</span>
              <span>{admin?.username}</span>
            </div>
            <div className="row">
              <span>Credit Reference</span>
              <span>{admin?.creditReferance}</span>
            </div>
            <div className="row">
              <span>Balance</span>
              <span>{admin?.balance}</span>
            </div>
            <div className="row">
              <span>PNL</span>
              <span
                className={`${admin?.pnl?.startsWith("-") || admin?.pnl?.startsWith("0") ? "text-danger" : "text-success"}`}
              >
                {admin?.pnl}
              </span>
            </div>
            <div className="row">
              <span>User Status</span>
              <span
                className={`${admin?.userStatus == 1 ? "SUCCESS" : "WARNING"}`}
              >
                {" "}
                {admin?.userStatus === 1 ? "active" : "inactive"}
              </span>
            </div>
            <div className="row">
              <span>Betting Status</span>
              <span
                className={`${admin?.bettingStatus == 1 ? "SUCCESS" : "WARNING"}`}
              >
                {" "}
                {admin?.bettingStatus === 1 ? "active" : "inactive"}
              </span>
            </div>

            <div className="row">
              <span>Reg. Dat</span>
              <span>{admin?.registrationDate}</span>
            </div>
            <div className="actions">
              <button
                onClick={() =>
                  handleOpenModal(admin, ModalNames.creditReference)
                }
                className="btn btn-success"
              >
                CR
              </button>
              <button
                onClick={() => handleOpenModal(admin, ModalNames.clientDeposit)}
                className="btn btn-danger"
              >
                D
              </button>
              <button
                onClick={() =>
                  handleOpenModal(admin, ModalNames.directWithdraw)
                }
                className="btn btn-warning"
              >
                W
              </button>
              <button
                onClick={() =>
                  handleOpenModal(admin, ModalNames.changePassword)
                }
                className="btn btn-danger"
              >
                P
              </button>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewAdmin;
