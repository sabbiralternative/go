import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole, ModalNames } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { useUTRQuery } from "../../hooks/utr";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { Pagination } from "rsuite";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { FaEdit } from "react-icons/fa";
import EditDeposit from "../../components/modal/EditDeposit/EditDeposit";
import LevelTable from "../../components/shared/LevelTable/LevelTable";

const PendingDeposit = () => {
  const [modal, setModal] = useState({
    name: "",
    id: "",
  });
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

  const { data: pendingDeposit, refetch } = useUTRQuery(payload, 30000);
  const meta = pendingDeposit?.pagination;

  const handleOpenModal = (deposit, name) => {
    setModal({
      name,
      id: deposit?.id,
    });
  };

  return (
    <Fragment>
      {modal?.name === ModalNames.editDeposit && (
        <EditDeposit modal={modal} setModal={setModal} refetch={refetch} />
      )}
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
      {pendingDeposit?.result?.map((deposit) => {
        return (
          <div key={deposit?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Level</span>
              <span className="right">{deposit?.level}</span>
            </div>
            <div className="row">
              <span>User Id</span>
              <span>{deposit?.userId}</span>
            </div>
            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ||
              adminRole === AdminRole.branch_staff) && (
              <div className="row">
                <span>Branch Name</span>
                <span>{deposit?.branch_name}</span>
              </div>
            )}

            <div className="row">
              <span>Amount</span>
              <span>{deposit?.amount}</span>
            </div>
            <div className="row">
              <span>UTR</span>
              <span>
                {deposit?.utr}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(deposit?.utr)}
                />
              </span>
            </div>
            <div className="row">
              <span>Slip</span>
              {deposit?.image ? (
                <span
                  onClick={() => {
                    setImage(deposit?.image);
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

              <span>{deposit?.type}</span>
            </div>
            <div className="row">
              <span>Status</span>

              <span className={deposit.status}>{deposit?.status}</span>
            </div>
            <div className="row">
              <span>Remark</span>

              <span>{deposit?.remark}</span>
            </div>
            <div className="row">
              <span>Site</span>

              <span>{deposit?.site}</span>
            </div>
            <div className="row">
              <span>Request Time</span>

              <span>{deposit?.date_added}</span>
            </div>

            <div
              className="actions"
              style={{
                display:
                  adminRole === AdminRole.master ||
                  adminRole === AdminRole.branch_staff
                    ? "flex"
                    : "none",
              }}
            >
              <button
                onClick={() => handleOpenModal(deposit, ModalNames.editDeposit)}
                className="btn btn-success"
              >
                <FaEdit />
              </button>
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

      <LevelTable />
    </Fragment>
  );
};

export default PendingDeposit;
