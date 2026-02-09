import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";

const UTRSearch = () => {
  const [loading, setLoading] = useState(true);
  const [utr, setUtr] = useState("");
  const [image, setImage] = useState("");
  const [utrData, setUtrData] = useState([]);

  const searchUTR = async (e) => {
    e.preventDefault();
    const payload = {
      type: "searchUTR",
      utr,
      pagination: true,
    };
    const { data } = await AxiosSecure.post(API.utr, payload);
    setLoading(false);
    if (data?.success) {
      setUtrData(data?.result);
    }
  };

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {/* Header */}
      <PageHeader title="Clients" />
      <div className="client-card">
        <form
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            gap: "15px",
          }}
          onSubmit={searchUTR}
        >
          <input
            onChange={(e) => setUtr(e.target.value)}
            type="text"
            placeholder="Search User"
            value={utr}
          />
          <button type="submit" className="btn" style={{ width: "80px" }}>
            Search
          </button>
        </form>
      </div>
      {utrData?.length > 0 &&
        utrData?.map((client) => {
          return (
            <div key={client?.userId} className="client-card">
              <div className="card-top">
                <strong>Key</strong>
                <span className="status">
                  <i className="ph ph-lock-key-open" /> Value
                </span>
              </div>
              <div className="row">
                <span>User Id</span>
                <span className="right">{client?.user_id}</span>
              </div>

              {client?.loginnameVisible && (
                <div className="row">
                  <span>Login Name</span>
                  <span>{client?.loginname}</span>
                </div>
              )}

              <div className="row">
                <span>Amount</span>
                <span>{client?.amount}</span>
              </div>
              <div className="row">
                <span>Date Added</span>
                <span>{client?.date_added}</span>
              </div>

              <div className="row">
                <span>Date Modified</span>
                <span>{client?.date_modified}</span>
              </div>

              <div className="row">
                <span>Image</span>
                {client?.image ? (
                  <span
                    onClick={() => {
                      setImage(client?.image);
                    }}
                    style={{ color: "#346cee", cursor: "pointer" }}
                  >
                    View
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </div>

              <div className="row">
                <span>Status</span>

                <span className={client?.status}>{client?.status}</span>
              </div>

              <div className="row">
                <span>Remark</span>

                <span>{client?.remark}</span>
              </div>
            </div>
          );
        })}
      {!loading && utrData?.length === 0 && (
        <div className="client-card">No UTR found</div>
      )}
    </Fragment>
  );
};

export default UTRSearch;
