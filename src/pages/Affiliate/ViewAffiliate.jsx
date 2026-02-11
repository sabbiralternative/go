import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useAffiliateQuery } from "../../hooks/affiliate";
import { useForm } from "react-hook-form";

const ViewAffiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const affiliate_id = params.get("affiliate_id");
  const type = params.get("type");
  const navigate = useNavigate();

  const { data: affiliateData, isSuccess } = useAffiliateQuery({
    type,
    affiliate_id,
  });

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = ({ affiliate_id }) => {
    navigate(
      `/view-affiliate?affiliate_id=${affiliate_id}&type=search_affiliate`,
    );
    reset();
  };
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Affiliate" />
      {/* Search */}
      <form onSubmit={handleSubmit(onSubmit)} className="search-box">
        <i className="ph ph-magnifying-glass" />
        <input
          {...register("affiliate_id")}
          type="text"
          placeholder="Search Affiliate"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
      {/* Client Card */}
      {affiliateData?.result?.map((affiliate) => {
        return (
          <div key={affiliate?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Affiliate Id</span>
              <span className="right">{affiliate?.affiliate_id}</span>
            </div>
            <div className="row">
              <span>Branch</span>
              <span>{affiliate?.branch}</span>
            </div>
            <div className="row">
              <span>Mobile</span>
              <span>{affiliate?.mobile}</span>
            </div>
            <div className="row">
              <span>Site</span>
              <span>{affiliate?.site}</span>
            </div>
            <div className="row">
              <span>Status</span>
              <span>
                {" "}
                {affiliate?.userStatus === 1 ? "Active" : "InActive"}
              </span>
            </div>

            <div className="row">
              <span>Registration Date</span>
              <span>{affiliate?.registrationDate}</span>
            </div>
            <div className="actions">
              <button
                className="btn btn-icon btn-sm btn-success"
                onClick={() =>
                  navigate(
                    `/view-affiliate-client?affiliate_id=${affiliate?.affiliate_id}`,
                  )
                }
              >
                U
              </button>
              <button
                className="btn btn-icon btn-sm btn-warning"
                onClick={() =>
                  navigate(
                    `/view-affiliate-deposit?affiliate_id=${affiliate?.affiliate_id}`,
                  )
                }
              >
                D
              </button>
              <button
                className="btn btn-icon btn-sm btn-danger"
                onClick={() =>
                  navigate(
                    `/view-affiliate-withdraw?affiliate_id=${affiliate?.affiliate_id}`,
                  )
                }
              >
                W
              </button>
            </div>
          </div>
        );
      })}
      {isSuccess && affiliateData?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "11px" }}>
            No affiliate found with given search query.
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewAffiliate;
