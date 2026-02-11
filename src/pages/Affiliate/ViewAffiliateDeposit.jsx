import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useLocation } from "react-router-dom";
import { useAffiliateQuery } from "../../hooks/affiliate";
import { DatePicker, Pagination } from "rsuite";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";

const ViewAffiliateDeposit = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const affiliate_id = params.get("affiliate_id");
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(defaultDate(1));
  const [toDate, setToDate] = useState(new Date());

  const { data: affiliateDepositData, isSuccess } = useAffiliateQuery({
    type: "view_affiliate_deposit",
    affiliate_id,
    page,
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
  });

  const meta = affiliateDepositData?.pagination;
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="View Affiliate Deposit" />

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
              onChange={(date) => setFromDate(date)}
              value={fromDate}
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
              onChange={(date) => setToDate(date)}
              value={toDate}
              block
            />
          </div>
        </div>
      </div>

      <div className="flex-end">
        {meta && (
          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={page}
            onChangePage={setPage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>
      {/* Client Card */}
      {affiliateDepositData?.result?.map((affiliate, i) => {
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
              <span className="right">{affiliate?.user_id}</span>
            </div>
            <div className="row">
              <span>Branch</span>
              <span>{affiliate?.branch}</span>
            </div>

            <div className="row">
              <span>Amount</span>
              <span>{affiliate?.amount}</span>
            </div>
            <div className="row">
              <span>Date</span>
              <span>{affiliate?.date}</span>
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
            activePage={page}
            onChangePage={setPage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>
      {isSuccess && affiliateDepositData?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "11px" }}>No affiliate deposit found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewAffiliateDeposit;
