import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { useUTRQuery } from "../../hooks/utr";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { DatePicker, Pagination } from "rsuite";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";
import { useNavigate } from "react-router-dom";
import LevelTable from "../../components/shared/LevelTable/LevelTable";
import ClientColor from "../../components/shared/ClientColor/ClientColor";

const CompletedDeposit = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { adminRole } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState(1);
  const [branchId, setBranchId] = useState(0);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { data } = useGetIndexQuery({
    type: "getBranches",
  });

  const payload = {
    type: "viewUTR",
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

  const { data: completedDeposit } = useUTRQuery(payload, 30000);
  const meta = completedDeposit?.pagination;

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Completed Deposit" />
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
            alignItems: "end",
            gap: "10px",
            flexWrap: "wrap",
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
                width: "100%",
              }}
            >
              <label htmlFor="flatpickr-range" className="form-label">
                Branch
              </label>
              <select
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
        </div>
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
      {completedDeposit?.result?.map((item) => {
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
                  navigate(`/view-client?role=${adminRole}&history=deposit`);
                }}
              >
                <ClientColor client={item} /> {item?.userId}
              </span>
            </div>
            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master) && (
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
            {(adminRole === AdminRole.master ||
              adminRole === AdminRole.admin_staff) && (
              <div className="row">
                <span>Deposited From</span>
                {item?.depositedFrom ? (
                  <span>{item?.depositedFrom}</span>
                ) : (
                  <span>Add</span>
                )}
              </div>
            )}

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
            <div className="row">
              <span>Approval Time</span>

              <span>{item?.date_modified}</span>
            </div>
            <div className="row">
              <span>Approved By</span>

              <span>{item?.modify_by}</span>
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
      <LevelTable />
    </Fragment>
  );
};

export default CompletedDeposit;
