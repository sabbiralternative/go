import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditCoupon from "../../components/modal/EditCoupon/EditCoupon";

const ViewCoupons = () => {
  const [editCouponId, setEditCouponId] = useState(null);
  const { mutateAsync } = useBonusMutation();
  const {
    data,
    refetch: refetchCoupons,
    isSuccess,
  } = useBonusQuery({
    type: "viewCoupon",
  });

  const handleDelete = async (coupon_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await mutateAsync({
          type: "deleteCoupon",
          coupon_id,
        });
        if (data?.success) {
          refetchCoupons();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };
  return (
    <Fragment>
      {editCouponId && (
        <EditCoupon
          setEditCouponId={setEditCouponId}
          editCouponId={editCouponId}
          refetchCoupons={refetchCoupons}
        />
      )}
      {/* Header */}
      <PageHeader title="View Coupons" />

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
              <span>Coupon Code</span>
              <span className="right">{bonus?.coupon_code}</span>
            </div>
            <div className="row">
              <span>Added By</span>
              <span> {bonus?.added_by}</span>
            </div>

            <div className="row">
              <span>Coupon Amount</span>
              <span>{bonus?.coupon_amount}</span>
            </div>

            <div className="row">
              <span>Coupon Expiry Days</span>
              <span> {bonus?.coupon_expiry_days}</span>
            </div>
            <div className="row">
              <span>Usage Limits</span>
              <span> {bonus?.usage_limit}</span>
            </div>
            <div className="row">
              <span>Used Count</span>
              <span> {bonus?.used_count}</span>
            </div>
            <div className="row">
              <span>Status</span>
              <span
                style={{
                  color:
                    bonus?.status == 0
                      ? "#ef0909"
                      : bonus?.status == 1
                        ? "#0ea422"
                        : bonus?.status == 2
                          ? "orange"
                          : "",
                }}
              >
                {" "}
                {bonus?.status == 0
                  ? "Deleted"
                  : bonus?.status == 1
                    ? "Active"
                    : bonus?.status == 2
                      ? "Inactive"
                      : ""}
              </span>
            </div>

            <div
              className="actions"
              style={{
                display: bonus?.status !== 0 ? "flex" : "none",
              }}
            >
              <button
                onClick={() => setEditCouponId(bonus?.coupon_id)}
                className="btn btn-success"
              >
                E
              </button>
              <button
                onClick={() => handleDelete(bonus?.coupon_id)}
                className="btn btn-danger"
              >
                D
              </button>
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}>No coupon code available.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewCoupons;
