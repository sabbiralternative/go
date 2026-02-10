import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { useNavigate } from "react-router-dom";
import useCurrentBets from "../../hooks/useCurrentBets";
import { Pagination } from "rsuite";

const CurrentBets = () => {
  const navigate = useNavigate();
  const { adminRole } = useSelector((state) => state.auth);
  const [branchId, setBranchId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const { data: branches } = useGetIndexQuery({
    type: "getBranches",
  });
  const payload = { pagination: true, page: activePage };
  if (
    adminRole === AdminRole.hyper_master ||
    adminRole === AdminRole.admin_staff
  ) {
    payload.branch_id = branchId;
  }

  const { currentBets } = useCurrentBets(payload);

  const meta = currentBets?.pagination;

  return (
    <Fragment>
      <PageHeader title="Payment Methods" />
      {adminRole === AdminRole.admin_staff && (
        <div
          className="client-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <div>Branch:</div>
            <select
              style={{ width: "100%" }}
              defaultValue="0"
              onChange={(e) => {
                setBranchId(e.target.value);
              }}
              className="form-control"
            >
              <option disabled value="">
                Branch
              </option>
              <option value="0">All Branch</option>
              {branches?.result?.map((site) => (
                <option key={site?.branch_id} value={site?.branch_id}>
                  {site?.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="flex-end" style={{ marginTop: "10px" }}>
        {meta && (
          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={activePage}
            onChangePage={setActivePage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>

      {currentBets?.result?.map((betData) => {
        return (
          <div
            key={betData?.userId}
            className={`client-card ${betData?.betType}`}
          >
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Event Type</span>
              <span className="right">{betData?.sports}</span>
            </div>

            <div className="row">
              <span>Event Name</span>
              <span>{betData?.eventName}</span>
            </div>

            <div className="row">
              <span>User Id</span>
              <span
                onClick={() => {
                  navigate("/view-client");
                }}
              >
                {betData?.userId}
              </span>
            </div>

            <div className="row">
              <span>M Name</span>
              <span> {betData?.marketName}</span>
            </div>
            <div className="row">
              <span>Nation</span>
              <span> {betData?.nation}</span>
            </div>
            <div className="row">
              <span>U Rate</span>
              <span> {betData?.userRate}</span>
            </div>
            <div className="row">
              <span>Amount</span>
              <span> {betData?.amount}</span>
            </div>
            <div className="row">
              <span>Place Date</span>
              <span> {betData?.placeDate}</span>
            </div>
            <div className="row">
              <span>IP</span>
              <span> {betData?.ipAddress}</span>
            </div>
          </div>
        );
      })}
      <div className="flex-end" style={{ marginBottom: "10px" }}>
        {meta && (
          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={activePage}
            onChangePage={setActivePage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>
    </Fragment>
  );
};

export default CurrentBets;
