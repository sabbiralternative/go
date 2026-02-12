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
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";

const NoDepositReport = () => {
  const navigate = useNavigate();
  const { adminRole } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { mutate: handleExport } = useExportCSVMutation();
  const { mutate, data: depositData, isSuccess } = useExportMutation();

  const payload = {
    type: "getND",
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
    pagination: true,
  };

  const getDepositReport = async () => {
    mutate(payload);
  };

  const handleExportData = async () => {
    handleExport(payload);
  };

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="LDT Report" />
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
            <span>Number of clients : {depositData?.result?.length}</span>
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

                {(adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_master) && (
                  <div className="row">
                    <span>Mobile</span>
                    <span>{item?.mobile}</span>
                  </div>
                )}

                <div className="row">
                  <span>Registration Date</span>
                  <span> {item?.registrationDate}</span>
                </div>
                <div className="row">
                  <span>Credit Limit</span>
                  <span> {item?.credit_limit}</span>
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

export default NoDepositReport;
