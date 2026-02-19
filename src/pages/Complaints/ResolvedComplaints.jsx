import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { Pagination } from "rsuite";
import { useComplaintsQuery } from "../../hooks/complaints";

const ResolvedComplaints = () => {
  // const [complaintId, setComplaintId] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const { data, isSuccess } = useComplaintsQuery({
    type: "viewComplaint",
    status: 1,
    page: activePage,
  });
  const meta = data?.pagination;
  const result = data?.result;
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Resolved Complaints" />

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
      {/* Client */}
      {result?.map((item, i) => {
        return (
          <div key={i} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Id</span>
              <span className="right">{item?.complaint_id}</span>
            </div>
            <div className="row">
              <span>User Name</span>
              <span>{item?.username}</span>
            </div>

            <div className="row">
              <span>Mobile</span>
              <span>{item?.mobile}</span>
            </div>

            <div className="row">
              <span>Branch Name</span>
              <span>{item?.branch_name}</span>
            </div>

            <div className="row">
              <span>Message</span>
              <span>{item?.message}</span>
            </div>

            <div className="row">
              <span>Admin Message</span>

              <span>{item?.admin_message}</span>
            </div>

            <div className="row">
              <span>Status</span>

              <span> Resolved</span>
            </div>

            <div className="row">
              <span>Date Added</span>

              <span>{item?.date_added}</span>
            </div>
            <div className="row">
              <span>Statement Type</span>

              <span>{item?.statement_type}</span>
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
      {isSuccess && result?.length === 0 && (
        <div className="client-card">
          <p>No complaints found</p>
        </div>
      )}
    </Fragment>
  );
};

export default ResolvedComplaints;
