import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { AdminRole, ModalNames } from "../../constant/constant";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { usePaymentMutation, usePaymentQuery } from "../../hooks/payments";
import ImagePreview from "../../components/modal/ImagePreview/ImagePreview";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditPayment from "../../components/modal/EditPayment/EditPayment";

const ViewPaymentMethods = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    name: "",
    id: "",
  });
  const { adminRole } = useSelector((state) => state.auth);
  const [branchId, setBranchId] = useState(0);
  const { mutate: deletePaymentMethod } = usePaymentMutation();
  const { data } = useGetIndexQuery({
    type: "getBranches",
  });

  const [image, setImage] = useState("");

  const payload = {
    type: "viewPaymentMethods",
  };
  if (adminRole === AdminRole.admin_staff) {
    payload.branch_id = branchId;
  }
  const { data: paymentMethods, isSuccess, refetch } = usePaymentQuery(payload);

  const handleOpenModal = (payment, name) => {
    setModal({
      name,
      id: payment?.id,
    });
  };

  const handleDeletePaymentMethod = async (paymentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          type: "deletePayment",
          paymentId,
        };
        deletePaymentMethod(payload, {
          onSuccess: (data) => {
            if (data?.success) {
              refetch();
              toast.success(data?.result?.message);
            } else {
              toast.error(data?.error?.status?.[0]?.description);
            }
          },
        });
      }
    });
  };

  return (
    <Fragment>
      {image && <ImagePreview image={image} setImage={setImage} />}
      {modal?.name === ModalNames.editPaymentMethod && (
        <EditPayment modal={modal} setModal={setModal} refetch={refetch} />
      )}
      <PageHeader title="Payment Methods" />
      {adminRole === AdminRole.admin_staff && (
        <div
          className="client-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <div>Branch:</div>
            <select
              style={{ width: "100%" }}
              defaultValue="0"
              onChange={(e) => {
                setBranchId(e.target.value);
              }}
              className="form-control"
            >
              <option disabled value="">
                Branch
              </option>
              <option value="0">All Branch</option>
              {data?.result?.map((site) => (
                <option key={site?.branch_id} value={site?.branch_id}>
                  {site?.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Client Card */}
      {paymentMethods?.result?.map((method) => {
        return (
          <div key={method?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Type</span>
              <span className="right">{method?.type}</span>
            </div>
            {adminRole == AdminRole.admin_staff && (
              <div className="row">
                <span>Branch name</span>
                <span>{method?.branchName}</span>
              </div>
            )}

            <div className="row">
              <span>Account name</span>
              <span>{method?.name}</span>
            </div>
            <div className="row">
              <span>Slip</span>
              {method?.image && (
                <span>
                  <img
                    onClick={() => {
                      setImage(method?.image);
                    }}
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    src={method?.image}
                    alt=""
                  />
                </span>
              )}
            </div>

            <div className="row">
              <span>Limits</span>
              <span>
                {" "}
                Rs.{method?.minAmount}-{method?.maxAmount}
              </span>
            </div>
            <div className="row">
              <span>Status</span>
              <span
                className={`${method?.status == 1 ? "SUCCESS" : "WARNING"}`}
              >
                {" "}
                {method?.userStatus === 1 ? "active" : "inactive"}
              </span>
            </div>
            <div className="actions">
              {adminRole === AdminRole.admin_staff && (
                <button
                  onClick={() => navigate(`/view-payment-logs/${method?.id}`)}
                  className="btn btn-success"
                >
                  <FaEdit />
                </button>
              )}

              {adminRole !== AdminRole.admin_staff && (
                <Fragment>
                  <button
                    onClick={() =>
                      handleOpenModal(method, ModalNames.editPaymentMethod)
                    }
                    className="btn btn-success"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => {
                      handleDeletePaymentMethod(method?.id);
                    }}
                    className="btn btn-danger"
                  >
                    <FaTrash size={12} />
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        );
      })}

      {isSuccess && data?.result?.length === 0 && (
        <div className="client-card">
          <p style={{ fontSize: "12px" }}> No data found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ViewPaymentMethods;
