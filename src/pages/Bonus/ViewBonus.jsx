import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useBonusQuery } from "../../hooks/bonus";
import { useSelector } from "react-redux";
import { handleSplitUserName } from "../../utils/handleSplitUserName";
import { AdminRole } from "../../constant/constant";

const ViewBonus = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { data, isSuccess } = useBonusQuery({
    type: "viewBonus",
  });
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Bonus" />

      {/* Card */}
      {data?.result?.map((bonus, i) => {
        return (
          <div key={i} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Bonus Name</span>
              <span className="right">
                {handleSplitUserName(bonus?.bonus_name)}
              </span>
            </div>
            <div className="row">
              <span>Bonus Amount</span>
              <span>
                {" "}
                {bonus?.bonus_amount_type === "percentage"
                  ? `${bonus?.bonus_amount}%`
                  : `Rs. ${bonus?.bonus_amount}`}
              </span>
            </div>
            {adminRole === AdminRole.hyper_master && (
              <div className="row">
                <span>Number Of Usage</span>
                <span>{bonus?.no_of_use}</span>
              </div>
            )}
            <div className="row">
              <span>Max Bonus Amount</span>
              <span> {bonus?.bonus_max_amount}</span>
            </div>
            <div className="row">
              <span>Wagering Multiplier</span>
              <span> {bonus?.wagering_multiplier}</span>
            </div>
            <div className="row">
              <span>Min. Deposit</span>
              <span> {bonus?.minimum_deposit}</span>
            </div>
            <div className="row">
              <span>Bonus Expiry</span>
              <span>
                {" "}
                {bonus?.bonus_expiry_days > 1
                  ? `${bonus?.bonus_expiry_days} days`
                  : `${bonus?.bonus_expiry_days} day`}{" "}
              </span>
            </div>
            <div className="row">
              <span>Bonus Type</span>
              <span> {bonus?.bonus_type} </span>
            </div>
            <div className="row">
              <span>Status</span>
              <span
                className={`badge  me-1 ${
                  bonus?.status === 1 ? "bg-label-primary" : "bg-label-danger"
                }`}
              >
                {" "}
                {bonus?.status === 1 ? "active" : "inactive"}
              </span>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No bonus found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewBonus;
