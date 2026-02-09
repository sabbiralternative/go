import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { useUTRQuery } from "../../hooks/utr";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { Pagination } from "rsuite";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";

const PendingDeposit = () => {
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
    type: "viewUTR",
    status: "PENDING",
    amountFrom: amountFrom,
    amountTo: amountTo,
    pagination: true,
    page: activePage,
  };

  if (
    adminRole === AdminRole.admin_staff ||
    adminRole === AdminRole.hyper_master
  ) {
    payload.branch_id = branchId;
  }

  const { data: pendingDeposit } = useUTRQuery(payload, 30000);
  const meta = pendingDeposit?.pagination;

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Pending Deposit" />
      <div
        className="client-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {(adminRole === AdminRole.admin_staff ||
          adminRole === AdminRole.hyper_master) && (
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
        )}
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
      {pendingDeposit?.result?.map((item) => {
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
              <span>{item?.userId}</span>
            </div>
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
              <span>UTR</span>
              <span>
                {item?.utr}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(item?.utr)}
                />
              </span>
            </div>
            <div className="row">
              <span>Slip</span>
              {item?.image ? (
                <span
                  onClick={() => {
                    setImage(item?.image);
                  }}
                  style={{ color: "#346cee", cursor: "pointer" }}
                >
                  View
                </span>
              ) : (
                <span>N/A</span>
              )}
            </div>
            <div className="row">
              <span>Type</span>

              <span>{item?.type}</span>
            </div>
            <div className="row">
              <span>Status</span>

              <span className={item.status}>{item?.status}</span>
            </div>
            <div className="row">
              <span>Remark</span>

              <span>{item?.remark}</span>
            </div>
            <div className="row">
              <span>Site</span>

              <span>{item?.site}</span>
            </div>
            <div className="row">
              <span>Request Time</span>

              <span>{item?.date_added}</span>
            </div>

            {/* <div className="actions">
              <button>User bet history</button>
              <button>Transactions</button>
            </div> */}
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

export default PendingDeposit;
