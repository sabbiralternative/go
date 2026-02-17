import { DatePicker, Pagination } from "rsuite";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useExportCSVMutation } from "../../hooks/exportCSV";
import { defaultDate } from "../../utils/defaultDate";
import { useStatementQuery } from "../../hooks/statement";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";
import SettleBets from "../../components/modal/SettleBets/SettleBets";

const PNL = () => {
  const { mutate: exportMutation } = useExportCSVMutation();
  const [image, setImage] = useState("");
  const [type, setType] = useState("all");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const downlineId = params.get("downlineId");
  const role = params.get("role");
  const id = params.get("id");
  const [activePage, setActivePage] = useState(1);
  const [showBetsModal, setShowBetsModal] = useState(false);
  const [marketId, setMarketId] = useState("");
  const [startDate, setStartDate] = useState(defaultDate(30));
  const [endDate, setEndDate] = useState(new Date());
  const [table, setTable] = useState("new");

  const {
    data,
    refetch: refetchPNL,
    isSuccess,
  } = useStatementQuery({
    downlineId,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
    role,
    id,
    page: activePage,
    type,
    table,
    pagination: true,
  });

  const meta = data?.pagination;

  /* Handle user history */
  const handleUserHistory = async (e) => {
    e.preventDefault();
    refetchPNL();
  };

  const defineColor = (transfer_type, pl) => {
    if (transfer_type === "deposit") {
      return "pl-deposit";
    }
    if (transfer_type === "withdraw") {
      return "pl-withdraw";
    }
    if (pl > 0) {
      return "text-green";
    }
    if (pl < 0) {
      return "text-danger";
    }
  };

  const handleExport = async () => {
    const payload = {
      type: "clientPNL",
      from_date: moment(startDate).format("YYYY-MM-DD"),
      to_date: moment(endDate).format("YYYY-MM-DD"),
      method: type,
      downlineId,
    };
    exportMutation(payload);
  };

  const handleSettledBets = (statement_type, market_id) => {
    if (statement_type === "Betting P&L") {
      setMarketId(market_id);
      setShowBetsModal(true);
    }
  };
  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {showBetsModal && (
        <SettleBets
          setShowBetsModal={setShowBetsModal}
          marketId={marketId}
          searchUser={downlineId}
        />
      )}
      {/* Header */}
      <PageHeader title="Profit & Loss" />
      <form
        onSubmit={handleUserHistory}
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
              alignItems: "center",
              justifyContent: "center",
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
        />

        <button style={{ height: "38px" }} className="btn btn-primary">
          Search
        </button>
      </form>
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
      {isSuccess && data?.result?.length > 0 && (
        <Fragment>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginLeft: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ margin: "0px" }}>All</p>
              <input
                onChange={(e) => setType(e.target.value)}
                checked={type === "all"}
                type="radio"
                value="all"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ margin: "0px" }}>Sports </p>
              <input
                onChange={(e) => setType(e.target.value)}
                checked={type === "sports"}
                type="radio"
                value="sports"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ margin: "0px" }}>Casino </p>
              <input
                onChange={(e) => setType(e.target.value)}
                checked={type === "casino"}
                type="radio"
                value="casino"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ margin: "0px" }}>Deposit</p>
              <input
                onChange={(e) => setType(e.target.value)}
                checked={type === "deposit"}
                type="radio"
                value="deposit"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ margin: "0px" }}>Withdraw</p>
              <input
                onChange={(e) => setType(e.target.value)}
                checked={type === "withdraw"}
                type="radio"
                value="withdraw"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => handleExport()}
                type="button"
                className="btn btn-primary"
              >
                Export
              </button>
            </div>
          </div>

          {data?.result?.map((item, i) => {
            return (
              <div key={i} className="client-card">
                <div className="card-top">
                  <strong>Key</strong>
                  <span className="status">
                    <i className="ph ph-lock-key-open" /> Value
                  </span>
                </div>
                <div className="row">
                  <span>PL</span>
                  <span
                    onClick={() =>
                      handleSettledBets(item?.statement_type, item?.market_id)
                    }
                    style={{
                      cursor: `${
                        item?.statement_type === "Betting P&L" ? "pointer" : ""
                      }`,
                    }}
                    className={`
                        ${defineColor(item?.transfer_type, item?.pl)}
                        `}
                  >
                    {" "}
                    {item?.pl}
                  </span>
                </div>
                <div className="row">
                  <span>Balance</span>
                  <span> {item?.balance}</span>
                </div>
                {(type === "withdraw" || type === "deposit") && (
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
                )}

                <div className="row">
                  <span>Bank Details</span>
                  <span> {item?.bank_details}</span>
                </div>

                <div className="row">
                  <span>Date</span>
                  <span> {item?.date_added}</span>
                </div>
                <div className="row">
                  <span>Narration</span>
                  <span> {item?.narration}</span>
                </div>

                <div className="row">
                  <span>Type</span>
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
      {isSuccess && data?.result?.length === 0 && (
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

export default PNL;
