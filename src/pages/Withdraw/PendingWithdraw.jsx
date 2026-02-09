import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { Pagination } from "rsuite";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { useWithdrawQuery } from "../../hooks/withdraw";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import { useNavigate } from "react-router-dom";

const PendingWithdraw = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { adminRole } = useSelector((state) => state.auth);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [branchId, setBranchId] = useState(0);
  const { data } = useGetIndexQuery({
    type: "getBranches",
  });

  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    amountFrom: amountFrom,
    amountTo: amountTo,
    pagination: true,
    page: activePage,
    fromDate: moment(defaultDate(1)).format("YYYY-MM-DD"),
    toDate: moment(new Date()).format("YYYY-MM-DD"),
  };

  if (
    adminRole === AdminRole.admin_staff ||
    adminRole === AdminRole.hyper_master
  ) {
    payload.branch_id = branchId;
  }

  const { data: pendingWithdraw } = useWithdrawQuery(payload, 30000);
  const meta = pendingWithdraw?.pagination;

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Pending Withdraw" />
      {(adminRole === AdminRole.branch_staff ||
        adminRole === AdminRole.master) && (
        <div
          className="client-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <input
            style={{ width: "100%" }}
            onChange={(e) => setAmountFrom(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter From Amount"
            value={amountFrom}
          />
          <input
            style={{ width: "100%" }}
            onChange={(e) => setAmountTo(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter To Amount"
            value={amountTo}
          />
        </div>
      )}
      {(adminRole === AdminRole.admin_staff ||
        adminRole === AdminRole.hyper_master) && (
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
                setActivePage(1);
              }}
              className="form-control"
            >
              <option disabled value="">
                Branch
              </option>
              <option value="0">All Branch</option>
              {data?.result?.map((site) => (
                <option key={site?.branch_id} value={site?.branch_id}>
                  {site?.branch_name}
                </option>
              ))}
            </select>
          </div>

          <input
            style={{ width: "100%" }}
            onChange={(e) => setAmountFrom(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter From Amount"
            value={amountFrom}
          />
          <input
            style={{ width: "100%" }}
            onChange={(e) => setAmountTo(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter To Amount"
            value={amountTo}
          />
        </div>
      )}

      <div className="flex-end">
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
      {/* Client Card */}
      {pendingWithdraw?.result?.map((item) => {
        return (
          <div key={item?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Level</span>
              <span className="right">{item?.level}</span>
            </div>
            <div className="row">
              <span>User Id</span>
              <span
                onClick={() => {
                  navigate(`/view-client?role=${adminRole}&history=withdraw`);
                }}
              >
                {item?.userId}
              </span>
            </div>
            {item?.loginnameVisible && (
              <div className="row">
                <span>Login Name</span>
                <span className="right">{item?.loginname}</span>
              </div>
            )}

            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ||
              adminRole === AdminRole.branch_staff) && (
              <div className="row">
                <span>Branch Name</span>
                <span>{item?.branch_name}</span>
              </div>
            )}

            <div className="row">
              <span>Amount</span>
              <span>{item?.amount}</span>
            </div>

            <div className="row">
              <span>Bank Account Name</span>
              <span>
                {item?.bank_account_name}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(item?.bank_account_name)}
                />
              </span>
            </div>
            <div className="row">
              <span>Account Number</span>
              <span>
                {item?.account_number}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(item?.account_number)}
                />
              </span>
            </div>

            <div className="row">
              <span>Bank Name</span>
              <span>
                {item?.bank_name}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(item?.bank_name)}
                />
              </span>
            </div>
            <div className="row">
              <span>IFSC</span>
              <span>
                {item?.ifsc}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(item?.ifsc)}
                />
              </span>
            </div>

            <div className="row">
              <span>UPI ID</span>
              <span>{item?.upi_id} </span>
            </div>

            <div className="row">
              <span>Status</span>

              <span className={item.status}>{item?.status}</span>
            </div>

            <div className="row">
              <span>Request Time</span>

              <span>{item?.date_added}</span>
            </div>

            <div className="row">
              <span>Request Time</span>

              <span>{item?.date_added}</span>
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

export default PendingWithdraw;
