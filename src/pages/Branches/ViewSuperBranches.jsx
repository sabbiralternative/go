import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole, ModalNames } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useViewBranchesQuery } from "../../hooks/viewBranches";
import { handleSplitUserName } from "../../utils/handleSplitUserName";
import { useNavigate } from "react-router-dom";
import Deposit from "../../components/modal/Deposit/Deposit";
import Withdraw from "../../components/modal/Withdraw/Withdraw";
import ChangePassword from "../../components/modal/ChangePassword/ChangePassword";
import ChangeStatus from "../../components/modal/ChangeStatus/ChangeStatus";
import CreditReference from "../../components/modal/CreditReference/CreditReference";
import WhatsappNumber from "../../components/modal/WhatsappNumber/WhatsappNumber";
import DashboardBalance from "../../components/modal/DashboardBalance/DashboardBalance";

const ViewSuperBranches = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    name: "",
    username: "",
    role: "",
    id: "",
    registrationStatus: "",
  });
  const { adminRole } = useSelector((state) => state.auth);
  const { data, isSuccess, refetch } = useViewBranchesQuery({
    branch_type: "super_branch",
    pagination: true,
  });
  const handleOpenModal = (branch, name) => {
    setModal({
      name,
      username: branch?.username,
      role: branch?.role,
      id: branch?.id,
      registrationStatus: branch?.registrationStatus,
    });
  };

  return (
    <Fragment>
      {modal?.name === ModalNames.deposit && (
        <Deposit modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.withdraw && (
        <Withdraw modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.changePassword && (
        <ChangePassword modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.changeStatus && (
        <ChangeStatus modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.creditReference && (
        <CreditReference modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.whatsapp && (
        <WhatsappNumber modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.dashboardBalance && (
        <DashboardBalance modal={modal} setModal={setModal} />
      )}
      {/* Header */}
      <PageHeader title="Super Branches" />

      {/* Client Card */}
      {data?.result?.map((branch) => {
        return (
          <div key={branch?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Username</span>
              <span className="right">
                {handleSplitUserName(branch?.username)}
              </span>
            </div>
            {adminRole == AdminRole.admin_staff && (
              <div className="row">
                <span>Exposure</span>
                <span>{branch?.exposure}</span>
              </div>
            )}

            {adminRole !== AdminRole.admin_staff && (
              <div className="row">
                <span>Credit Reference</span>
                <span>{branch?.creditReferance}</span>
              </div>
            )}
            {adminRole !== AdminRole.admin_staff && (
              <div className="row">
                <span>Balance</span>
                <span>{branch?.balance}</span>
              </div>
            )}

            {adminRole !== AdminRole.admin_staff && (
              <div className="row">
                <span>P/L</span>
                <span>{branch?.pnl}</span>
              </div>
            )}

            <div className="row">
              <span>Client Balance</span>
              <span>{branch?.clientBalance}</span>
            </div>
            <div className="row">
              <span>Status</span>
              <span> {branch?.userStatus === 1 ? "active" : "inactive"}</span>
            </div>
            <div className="row">
              <span>Betting Status</span>
              <span>
                {" "}
                {branch?.bettingStatus === 1 ? "active" : "inactive"}
              </span>
            </div>
            <div className="row">
              <span>Registration Status</span>
              <span>
                {" "}
                {branch?.registrationStatus === 1 ? "active" : "inactive"}
              </span>
            </div>
            {adminRole !== AdminRole.admin_staff && (
              <div className="row">
                <span>Reg. Date</span>
                <span> {branch?.registrationDate}</span>
              </div>
            )}

            <div
              className="actions"
              style={{
                display: adminRole === AdminRole.admin_staff ? "none" : "flex",
              }}
            >
              <button
                className="btn btn-success"
                onClick={() => handleOpenModal(branch, ModalNames.deposit)}
              >
                D
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleOpenModal(branch, ModalNames.withdraw)}
              >
                W
              </button>
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/pnl?username=${branch?.username}`)}
              >
                PL
              </button>
              <button
                className="btn btn-info"
                onClick={() =>
                  handleOpenModal(branch, ModalNames.changePassword)
                }
              >
                P
              </button>
              <button
                className="btn btn-dark"
                onClick={() => handleOpenModal(branch, ModalNames.changeStatus)}
              >
                S
              </button>
              <button
                onClick={() =>
                  handleOpenModal(branch, ModalNames.creditReference)
                }
                className="btn btn-primary"
              >
                CR
              </button>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}> No data found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewSuperBranches;
