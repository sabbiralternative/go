import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useAffiliateQuery } from "../../hooks/affiliate";
import { useForm } from "react-hook-form";
import { Pagination } from "rsuite";

const ViewAffiliateClient = () => {
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const affiliate_id = params.get("affiliate_id");
  const [page, setPage] = useState(1);
  const { data: affiliateData, isSuccess } = useAffiliateQuery({
    affiliate_id,
    type: "view_affiliate_clients",
    page,
  });

  const meta = affiliateData?.pagination;

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
      {affiliateData?.result?.map((affiliate, i) => {
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
              <span className="right">{affiliate?.punter_id}</span>
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
                onClick={() =>
                  navigate(
                    `/pnl?id=${affiliate?.punter_id}&role=punter&downlineId=${affiliate?.punter_id}`,
                  )
                }
              >
                PL
              </button>
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

export default ViewAffiliateClient;
