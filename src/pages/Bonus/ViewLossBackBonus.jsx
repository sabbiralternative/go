import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useLossBackQuery } from "../../hooks/lossback";

const ViewLossBackBonus = () => {
  const { data, isSuccess } = useLossBackQuery({
    type: "view_lossback_bonus",
  });

  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Lossback Bonus" />

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
              <span>Bonus</span>
              <span className="right">{loss_back?.bonus_percentage}</span>
            </div>
            <div className="row">
              <span>Event Name</span>
              <span> {loss_back?.event_name}</span>
            </div>

            <div className="row">
              <span>From Date</span>
              <span>{loss_back?.from_date}</span>
            </div>

            <div className="row">
              <span>To Date</span>
              <span> {loss_back?.to_date}</span>
            </div>
            <div className="row">
              <span>Expire Date</span>
              <span> {loss_back?.expires_at}</span>
            </div>
            <div className="row">
              <span>Minimum Loss Amount</span>
              <span> {loss_back?.minimum_loss_amount}</span>
            </div>
            <div className="row">
              <span>Mode</span>
              <span> {loss_back?.mode} </span>
            </div>
            <div className="row">
              <span>Visible On</span>
              <span> {loss_back?.visible_on} </span>
            </div>
            <div className="row">
              <span>Punter Id</span>
              <span> {loss_back?.punter_id} </span>
            </div>
            <div className="row">
              <span>Referral Id</span>
              <span> {loss_back?.referral_id} </span>
            </div>

            <div className="row">
              <span>Status</span>
              <span
                className={`badge  me-1 ${
                  loss_back?.status === "ACTIVE"
                    ? "bg-label-primary"
                    : "bg-label-danger"
                }`}
              >
                {" "}
                {loss_back?.status}
              </span>
            </div>
            <div className="row">
              <span>Date Added</span>
              <span> {loss_back?.date_added} </span>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No lossback found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewLossBackBonus;
