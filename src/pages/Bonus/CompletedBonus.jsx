import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useBonusQuery } from "../../hooks/bonus";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CompletedBonus = () => {
  const navigate = useNavigate();
  const payload = {
    type: "viewBonusStatement",
    is_claimed: 1,
  };
  const { data, isSuccess } = useBonusQuery(payload, 30000);
  const formateDate = (date) => {
    if (date) {
      const formateDate = moment(date).format("DD-MM-YYYY, h:mm a");
      return formateDate;
    }
  };
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Completed Bonus" />

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
              <span>User Id</span>
              <span
                onClick={() => {
                  navigate(`/view-client?user_id=${bonus?.user_id}`);
                }}
                className="right"
              >
                {bonus?.user_id}
              </span>
            </div>
            <div className="row">
              <span>Bonus Amount</span>
              <span> {bonus?.bonus_amount}</span>
            </div>

            <div className="row">
              <span>Wagering Amount</span>
              <span>{bonus?.wagering_amount}</span>
            </div>

            <div className="row">
              <span>Wagering Completed</span>
              <span> {bonus?.wagering_complete_amount}</span>
            </div>
            <div className="row">
              <span>Wagering Status</span>
              <span
                style={{
                  color:
                    bonus?.is_wagering_complete === "Complete"
                      ? "#39da8a"
                      : "red",
                }}
              >
                {" "}
                {bonus?.is_wagering_complete}
              </span>
            </div>
            <div className="row">
              <span>Claim Status</span>
              <span
                style={{
                  color:
                    bonus?.is_claimed === "Complete"
                      ? "#39da8a"
                      : bonus?.is_claimed === "Pending"
                        ? "orange"
                        : "red",
                }}
              >
                {" "}
                {bonus?.is_claimed}
              </span>
            </div>
            <div className="row">
              <span>Issue Date</span>
              <span> {formateDate(bonus?.date_added)} </span>
            </div>
            <div className="row">
              <span>Expiry Date</span>
              <span> {formateDate(bonus?.expiry_date)}</span>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No completed bonus.</p>
        </div>
      )}
    </Fragment>
  );
};

export default CompletedBonus;
