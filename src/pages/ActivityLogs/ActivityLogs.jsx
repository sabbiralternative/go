import { useLocation } from "react-router-dom";
import { Pagination } from "rsuite";
import { Fragment, useState } from "react";
import { useGetActivityLogs } from "../../hooks/activityLog";
import PageHeader from "../../components/shared/PageHeader/PageHeader";

const ActivityLogs = () => {
  const [activePage, setActivePage] = useState(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const id = params.get("id");
  const idWithOutP = id.split("-")[1];

  const { data, isSuccess } = useGetActivityLogs({
    page: activePage,
    id: idWithOutP,
    role,
  });

  const meta = data?.pagination;

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Activity Logs" />

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
                  <span>IP Address</span>
                  <span className="right">{item?.ip_address}</span>
                </div>

                <div className="row">
                  <span>Date</span>
                  <span> {item?.date}</span>
                </div>

                <div className="row">
                  <span>Narration</span>
                  <span> {item?.narration}</span>
                </div>

                <div className="row">
                  <span>Type</span>
                  <span> {item?.type}</span>
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
          <p style={{ fontSize: "12px" }}> No data found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ActivityLogs;
