import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useViewBranchesQuery } from "../../hooks/viewBranches";
import { handleSplitUserName } from "../../utils/handleSplitUserName";

const ViewSuperBranches = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { data } = useViewBranchesQuery({
    branch_type: "super_branch",
    pagination: true,
  });

  return (
    <Fragment>
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

            {/* <div className="actions">
              <button>User bet history</button>
              <button>Transactions</button>
            </div> */}
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewSuperBranches;
