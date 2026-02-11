import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useGetIndexQuery } from "../../hooks";

const ViewNotification = () => {
  const { data, isSuccess } = useGetIndexQuery({
    type: "viewNotification",
  });
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="View Notification" />

      {/* Card */}
      {data?.result?.map((notification, i) => {
        return (
          <div key={i} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Notification Text</span>
              <span className="right">
                {" "}
                <img src={notification?.notification_text} width="100px" />
              </span>
            </div>
            <div className="row">
              <span>Site</span>
              <span>{notification?.site}</span>
            </div>
            <div className="row">
              <span>Date Added</span>
              <span>{notification?.date_added}</span>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No notification found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewNotification;
