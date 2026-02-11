import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useBannerQuery } from "../../hooks/banner";

const ViewBanner = () => {
  const { data } = useBannerQuery({
    type: "getBanners",
  });
  return (
    <Fragment>
      {/* Header */}
      <PageHeader title="Banners" />

      {/* Card */}
      {data?.result?.map((banner, i) => {
        return (
          <div key={i} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Banner</span>
              <span className="right">
                {" "}
                <img src={banner?.banner_link} width="100px" />
              </span>
            </div>
            <div className="row">
              <span>Site</span>
              <span>{banner?.site}</span>
            </div>
            <div className="row">
              <span>Sort</span>
              <span>{banner?.priority}</span>
            </div>

            <div className="row">
              <span>Status</span>
              <span> {banner?.status === 1 ? "Active" : "InActive"}</span>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewBanner;
