import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole, ModalNames } from "../../constant/constant";
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
import { FaEdit, FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import EditWithdraw from "../../components/modal/EditWithdraw/EditWithdraw";
import DepositReport from "../../components/modal/DepositReport/DepositReport";

const PendingWithdraw = () => {
  const [modal, setModal] = useState({
    name: "",
    withdraw_id: "",
    downlineId: "",
  });
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

  const { data: pendingWithdraw, refetch } = useWithdrawQuery(payload, 30000);
  const meta = pendingWithdraw?.pagination;

  const handleOpenModal = (branch, name) => {
    setModal({
      name,
      downlineId: branch?.downlineId,
      withdraw_id: branch?.withdraw_id,
    });
  };

  const handleCopy = (item) => {
    const formattedText = `
    Client Id: ${item?.userId || ""}
    Amount: ${Math.abs(item?.amount) || ""}
    Bank Account Name: ${item?.bank_account_name || ""}
    Account Number: ${item?.account_number || ""}
    Bank Name: ${item?.bank_name || ""}
    IFSC: ${item?.ifsc || ""}
    Request Time: ${item?.date_added || ""}
  `;
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success("All data copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleNavigate = (client) => {
    const formatUserId = client?.userId?.split("-")[1];
    navigate(
      `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`,
    );
  };

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {modal?.name === ModalNames.editWithdraw && (
        <EditWithdraw modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.depositReport && (
        <DepositReport modal={modal} setModal={setModal} />
      )}
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
      {pendingWithdraw?.result?.map((withdraw) => {
        return (
          <div key={withdraw?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Level</span>
              <span className="right">{withdraw?.level}</span>
            </div>
            <div className="row">
              <span>User Id</span>
              <span
                onClick={() => {
                  navigate(`/view-client?role=${adminRole}&history=withdraw`);
                }}
              >
                {withdraw?.userId}
              </span>
            </div>
            {withdraw?.loginnameVisible && (
              <div className="row">
                <span>Login Name</span>
                <span className="right">{withdraw?.loginname}</span>
              </div>
            )}

            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ||
              adminRole === AdminRole.branch_staff) && (
              <div className="row">
                <span>Branch Name</span>
                <span>{withdraw?.branch_name}</span>
              </div>
            )}

            <div className="row">
              <span>Amount</span>
              <span>{withdraw?.amount}</span>
            </div>

            <div className="row">
              <span>Bank Account Name</span>
              <span>
                {withdraw?.bank_account_name}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleCopyToClipBoard(withdraw?.bank_account_name)
                  }
                />
              </span>
            </div>
            <div className="row">
              <span>Account Number</span>
              <span>
                {withdraw?.account_number}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleCopyToClipBoard(withdraw?.account_number)
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>Bank Name</span>
              <span>
                {withdraw?.bank_name}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(withdraw?.bank_name)}
                />
              </span>
            </div>
            <div className="row">
              <span>IFSC</span>
              <span>
                {withdraw?.ifsc}{" "}
                <MdOutlineContentCopy
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopyToClipBoard(withdraw?.ifsc)}
                />
              </span>
            </div>

            <div className="row">
              <span>UPI ID</span>
              <span>{withdraw?.upi_id} </span>
            </div>

            <div className="row">
              <span>Status</span>

              <span className={withdraw.status}>{withdraw?.status}</span>
            </div>

            <div className="row">
              <span>Request Time</span>

              <span>{withdraw?.date_added}</span>
            </div>

            <div className="row">
              <span>Request Time</span>

              <span>{withdraw?.date_added}</span>
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
                onClick={() =>
                  handleOpenModal(withdraw, ModalNames.editWithdraw)
                }
                className="btn btn-success"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleCopy(withdraw)}
                className="btn btn-info"
              >
                <FaRegCopy />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleNavigate(withdraw)}
              >
                PL
              </button>
              <button
                onClick={() =>
                  handleOpenModal(withdraw, ModalNames.depositReport)
                }
                className="btn btn-info"
              >
                DR
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
    </Fragment>
  );
};

export default PendingWithdraw;
