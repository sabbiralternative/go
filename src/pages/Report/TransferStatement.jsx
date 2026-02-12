import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useExportCSVMutation } from "../../hooks/exportCSV";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";
import { DatePicker, Pagination } from "rsuite";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { useTransferStatementMutation } from "../../hooks/transferStatement";

const TransferStatement = () => {
  const [table, setTable] = useState("new");
  const [activePage, setActivePage] = useState(1);
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { mutate: handleExport } = useExportCSVMutation();
  const {
    mutate,
    data: transferStatement,
    isSuccess,
  } = useTransferStatementMutation();

  const payload = {
    type: "viewTransfer",
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
    pagination: true,
    page: activePage,
    table,
  };

  const getDepositReport = async () => {
    mutate(payload);
  };

  const handleExportData = async () => {
    handleExport(payload);
  };

  const meta = transferStatement?.pagination;
  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Transfer Statement" />
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
          <div
            style={{
              width: "50px",
              display: "flex",
              gap: "0px 10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            New
            <input
              onChange={(e) => setTable(e.target.value)}
              type="radio"
              name="table"
              value="new"
              defaultChecked={table === "new"}
            />
          </div>
          <div
            style={{
              width: "50px",
              display: "flex",
              gap: "0px 10px",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "50px",
            }}
          >
            Old
            <input
              onChange={(e) => setTable(e.target.value)}
              type="radio"
              name="table"
              value="old"
              defaultChecked={table === "old"}
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
      {/* Card */}
      {isSuccess && transferStatement?.result?.length > 0 && (
        <Fragment>
          {transferStatement?.result?.map((item, i) => {
            return (
              <div key={i} className="client-card">
                <div className="card-top">
                  <strong>Key</strong>
                  <span className="status">
                    <i className="ph ph-lock-key-open" /> Value
                  </span>
                </div>
                <div className="row">
                  <span>Date Added</span>
                  <span className="right">{item?.date_added}</span>
                </div>

                <div className="row">
                  <span>Login Name</span>
                  <span> {item?.loginname}</span>
                </div>

                <div className="row">
                  <span>Amount</span>
                  <span
                    style={{
                      color:
                        item?.transfer_type === "deposit" ? "green" : "red",
                    }}
                  >
                    {item?.amount}
                  </span>
                </div>

                <div className="row">
                  <span>Narration</span>
                  <span> {item?.narration}</span>
                </div>

                <div className="row">
                  <span>Amount</span>
                  <span> {item?.amount}</span>
                </div>
                <div className="row">
                  <span>From To</span>
                  <span> {item?.fromTo}</span>
                </div>

                <div className="row">
                  <span>Transfer Type</span>
                  <span> {item?.transfer_type}</span>
                </div>
              </div>
            );
          })}
        </Fragment>
      )}
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
      {isSuccess && transferStatement?.result?.length === 0 && (
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

export default TransferStatement;
