import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useViewClientsQuery } from "../../hooks/viewClients";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import handleNavigateToWhatsApp from "../../utils/handleNavigateToWhatsApp";

const SuspendedClients = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { data, isSuccess } = useViewClientsQuery({
    searchId: "suspendedUsers",
    pagination: true,
  });

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Suspended Clients" />

      {/* Client Card */}
      {data?.result?.map((client) => {
        return (
          <div key={client?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Level</span>
              <span className="right">{client?.level}</span>
            </div>
            <div className="row">
              <span>User Id</span>
              <span>{client?.userId}</span>
            </div>
            {data?.result?.[0]?.username2Visible && (
              <div className="row">
                <span>Username</span>
                {client?.username2Visible && <span>{client?.username2}</span>}
              </div>
            )}

            {(adminRole == AdminRole.hyper_master ||
              adminRole == "admin_staff") && (
              <div className="row">
                <span>Branch</span>
                <span>{client?.branch}</span>
              </div>
            )}
            {adminRole !== "master" && adminRole !== "admin_staff" && (
              <div
                onClick={() =>
                  handleNavigateToWhatsApp(adminRole, client?.mobile)
                }
                className="row"
              >
                <span>Mobile</span>
                <span className="loss">
                  <i className="ph ph-whatsapp-logo" /> {client?.mobile}{" "}
                  <i className="ph ph-copy" />{" "}
                </span>
              </div>
            )}

            <div className="row">
              <span>Balance</span>
              <span>{client?.balance}</span>
            </div>
            <div className="row">
              <span>Total Deposit</span>
              <span>{client?.totalDeposit}</span>
            </div>
            <div className="row">
              <span>Total Withdraw</span>
              <span>{client?.totalWithdraw}</span>
            </div>
            <div className="row">
              <span>Exposure</span>
              <span>
                {" "}
                {client?.exposure || client?.exposure == 0
                  ? Number(client.exposure).toFixed(0)
                  : client?.exposure}
              </span>
            </div>
            <div className="row">
              <span>Betting Status</span>
              <span>
                {" "}
                {client?.bettingStatus === 1 ? "Active" : "InActive"}
              </span>
            </div>
            <div className="row">
              <span>Status</span>
              <span> {client?.userStatus === 1 ? "Active" : "InActive"}</span>
            </div>
            <div className="row">
              <span>Site</span>
              <span>{client?.site}</span>
            </div>
            <div className="row">
              <span>Reg. Date</span>
              <span>{client?.registrationDate}</span>
            </div>
            {/* <div className="actions">
              <button>User bet history</button>
              <button>Transactions</button>
            </div> */}
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

export default SuspendedClients;
