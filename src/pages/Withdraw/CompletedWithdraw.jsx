import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole, ModalNames } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { DatePicker, Pagination } from "rsuite";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { useWithdrawQuery } from "../../hooks/withdraw";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import { useNavigate } from "react-router-dom";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";
import AddSlip from "../../components/modal/AddSlip/AddSlip";

const CompletedWithdraw = () => {
  const [modal, setModal] = useState({
    name: "",
    withdraw_id: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { adminRole } = useSelector((state) => state.auth);

  const [activePage, setActivePage] = useState(1);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [branchId, setBranchId] = useState(0);
  const { data } = useGetIndexQuery({
    type: "getBranches",
  });

  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",

    pagination: true,
    page: activePage,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };

  if (
    adminRole === AdminRole.admin_staff ||
    adminRole === AdminRole.hyper_master
  ) {
    payload.branch_id = branchId;
  }

  const { data: pendingWithdraw, refetch } = useWithdrawQuery(payload, 30000);
  const meta = pendingWithdraw?.pagination;
  const handleOpenModal = (withdraw, name) => {
    setModal({
      name,
      withdraw_id: withdraw?.withdraw_id,
    });
  };
  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {modal?.name === ModalNames.addSlip && (
        <AddSlip modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {/* Header */}
      <PageHeader title="Pending Withdraw" />

      <div
        className="client-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div style={{ width: "100%" }}>
          <label htmlFor="flatpickr-range" className="form-label">
            From Date
          </label>
          <DatePicker
            style={{ width: "100%" }}
            format="yyyy-MM-dd"
            editable
            onChange={(date) => setStartDate(date)}
            value={startDate}
            block
          />
        </div>
        <div style={{ width: "100%" }}>
          <label htmlFor="flatpickr-range" className="form-label">
            To Date
          </label>
          <DatePicker
            style={{ width: "100%" }}
            format="yyyy-MM-dd"
            editable
            onChange={(date) => setEndDate(date)}
            value={endDate}
            block
          />
        </div>
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
        <DefaultDateButton
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          lastThreeMonth={true}
          lastSixMonth={true}
          lastOneYear={true}
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
      {pendingWithdraw?.result?.map((withdraw, index) => {
        return (
          <div key={index} className="client-card">
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
              <span>Remark</span>
              <span>{withdraw?.remark}</span>
            </div>
            <div className="row">
              <span>Slip</span>
              {withdraw?.withdraw_slip ? (
                <span
                  onClick={() => {
                    setImage(withdraw?.withdraw_slip);
                  }}
                  style={{ color: "#346cee", cursor: "pointer" }}
                >
                  View
                </span>
              ) : (
                <span
                  className="text-danger"
                  onClick={() => handleOpenModal(withdraw, ModalNames.addSlip)}
                >
                  Add
                </span>
              )}
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
              <span>Approval Time</span>

              <span>{withdraw?.date_modified}</span>
            </div>
            <div className="row">
              <span>Approved By</span>

              <span>{withdraw?.modify_by}</span>
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

export default CompletedWithdraw;
