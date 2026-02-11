import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useExportCSVMutation } from "../../hooks/exportCSV";
import { useSelector } from "react-redux";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";
import { DatePicker } from "rsuite";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";
import { useNavigate } from "react-router-dom";
import { useExportMutation } from "../../hooks/export";
import { AdminRole } from "../../constant/constant";
import { useGetIndexQuery } from "../../hooks";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";

const DepositReport = () => {
  const navigate = useNavigate();
  const { adminRole } = useSelector((state) => state.auth);
  const [branchId, setBranchId] = useState(0);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { mutate: handleExport } = useExportCSVMutation();
  const { mutate, data: depositData, isSuccess } = useExportMutation();
  const { data: branches } = useGetIndexQuery({
    type: "getBranches",
  });

  const payload = {
    type: "getDeposit",
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
    pagination: true,
    amountFrom: amountFrom ? Number(amountFrom) : null,
    amountTo: amountTo ? Number(amountTo) : null,
  };

  if (adminRole === AdminRole.admin_staff) {
    payload.branch_id = branchId;
  }

  const getDepositReport = async () => {
    mutate(payload);
  };

  const handleExportData = async () => {
    handleExport(payload);
  };

  let totalDeposit = 0;
  if (depositData?.result) {
    for (let data of depositData.result) {
      totalDeposit += parseFloat(data?.amount);
    }
  }

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Deposit Report" />
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
        </div>

        <DefaultDateButton
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          lastThreeMonth={true}
          lastSixMonth={true}
          lastOneYear={true}
        />
        {adminRole === AdminRole.admin_staff && (
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
        <button
          onClick={getDepositReport}
          style={{ height: "38px" }}
          className="btn btn-primary"
        >
          View
        </button>
        <button
          onClick={handleExportData}
          style={{ height: "38px" }}
          className="btn btn-primary"
        >
          Export
        </button>
      </div>

      {/* Card */}
      {isSuccess && depositData?.result?.length > 0 && (
        <Fragment>
          <p
            style={{
              marginTop: "12px",
              marginLeft: "12px",
            }}
          >
            {" "}
            <span>
              {" "}
              Total Deposit :
              {new Intl.NumberFormat("en-IN").format(totalDeposit)}
            </span>
          </p>
          <p
            style={{
              marginTop: "12px",
              marginLeft: "12px",
            }}
          >
            <span>Deposit Count: {depositData?.result?.length}</span>
          </p>

          {depositData?.result?.map((item, i) => {
            return (
              <div key={i} className="client-card">
                <div className="card-top">
                  <strong>Key</strong>
                  <span className="status">
                    <i className="ph ph-lock-key-open" /> Value
                  </span>
                </div>
                <div className="row">
                  <span>User Id</span>
                  <span
                    onClick={() => {
                      navigate(`/view-client?userId=${item?.userId}`);
                    }}
                    className="right"
                  >
                    {item?.userId}
                  </span>
                </div>
                <div className="row">
                  <span>Login Name</span>
                  <span> {item?.loginname}</span>
                </div>
                <div className="row">
                  <span>Branch Name</span>
                  <span> {item?.branch_name}</span>
                </div>
                {(adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_master) && (
                  <div className="row">
                    <span>Mobile</span>
                    <span>{item?.mobile}</span>
                  </div>
                )}

                <div className="row">
                  <span>Amount</span>
                  <span> {item?.amount}</span>
                </div>
                <div className="row">
                  <span>Utr</span>
                  <span> {item?.utr}</span>
                </div>
                <div className="row">
                  <span>Request Time</span>
                  <span> {item?.deposit_date}</span>
                </div>
                <div className="row">
                  <span>Approval Time</span>
                  <span> {item?.date_modified}</span>
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
                  <span>Remark</span>
                  <span> {item?.remark}</span>
                </div>
                <div className="row">
                  <span>Status</span>
                  <span
                    className={`badge ${
                      item?.status == "APPROVED"
                        ? "bg-label-primary"
                        : "bg-label-warning"
                    }`}
                  >
                    {" "}
                    {item?.status}
                  </span>
                </div>
              </div>
            );
          })}
        </Fragment>
      )}

      {isSuccess && depositData?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>
            {" "}
            No data found for given date range.
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default DepositReport;
