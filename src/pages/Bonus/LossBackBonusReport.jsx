import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useLossBackMutation } from "../../hooks/lossback";
import { useExportCSVMutation } from "../../hooks/exportCSV";
import { useGetIndexQuery } from "../../hooks";
import { useSelector } from "react-redux";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";
import { AdminRole } from "../../constant/constant";
import { DatePicker, Pagination } from "rsuite";
import DefaultDateButton from "../../components/shared/DefaultDateButton/DefaultDateButton";

const LossBackBonusReport = () => {
  const { mutate: exportMutation } = useExportCSVMutation();
  const { data: branches } = useGetIndexQuery({
    type: "getBranches",
  });

  const { adminRole } = useSelector((state) => state.auth);
  const [branchId, setBranchId] = useState(0);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);

  const payload = {
    type: "view_lossback_report",
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

  const { mutate, isSuccess, data } = useLossBackMutation();
  const meta = data?.pagination;

  const handleExport = async () => {
    exportMutation(payload);
  };

  const handleViewLossBackReport = () => {
    mutate(payload);
  };

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Lossback Bonus Report" />
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
                {branches?.result?.map((site) => (
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
        <button
          onClick={handleViewLossBackReport}
          style={{ height: "38px" }}
          className="btn btn-primary"
        >
          View
        </button>
        <button
          onClick={handleExport}
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
      {data?.result?.map((loss_back, i) => {
        return (
          <div key={i} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Punter Id</span>
              <span className="right">{loss_back?.punter_id}</span>
            </div>
            <div className="row">
              <span>Bonus Amount</span>
              <span> {loss_back?.bonus_amount}</span>
            </div>

            <div className="row">
              <span>Bonus Percent</span>
              <span>{loss_back?.bonus_percent}</span>
            </div>

            <div className="row">
              <span>Branch Name</span>
              <span> {loss_back?.branch_name}</span>
            </div>
            <div className="row">
              <span>Date Added</span>
              <span> {loss_back?.date_added}</span>
            </div>
            <div className="row">
              <span>Loginname</span>
              <span> {loss_back?.loginname}</span>
            </div>
            <div className="row">
              <span>Minimum Loss Amount</span>
              <span> {loss_back?.minimum_loss_amount} </span>
            </div>
            <div className="row">
              <span>Total Loss Amount</span>
              <span> {loss_back?.total_loss_amount} </span>
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
      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No lossback found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default LossBackBonusReport;
