import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useSelector } from "react-redux";
import { useStaffQuery } from "../../hooks/staff";
import { ModalNames } from "../../constant/constant";
import UpdateStaffStatus from "../../components/modal/UpdateStaffStatus/UpdateStaffStatus";
import StaffChangePassword from "../../components/modal/StaffChangePassword/StaffChangePassword";
import UpdatePermission from "../../components/modal/UpdatePermission/UpdatePermission";
import Swal from "sweetalert2";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";
import toast from "react-hot-toast";

const ViewStaff = () => {
  const [modal, setModal] = useState({
    name: "",
    staff_id: "",
  });
  const { adminRole } = useSelector((state) => state.auth);
  const { data, refetch } = useStaffQuery({
    type: "viewStaff",
    role: "admin_staff",
  });

  const handleOpenModal = (staff, name) => {
    setModal({
      name,
      staff_id: staff?.staff_id,
    });
  };

  const handleDelete = async (staff) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${staff?.staff_name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          type: "deleteStaff",
          bonus_id: staff?.staff_id,
        };
        const { data } = await AxiosSecure.post(API.staff, payload);

        if (data?.success) {
          refetch();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.description);
        }
      }
    });
  };
  return (
    <Fragment>
      {modal?.name === ModalNames.updateStaffStatus && (
        <UpdateStaffStatus
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        />
      )}
      {modal?.name === ModalNames.staffChangePassword && (
        <StaffChangePassword
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        />
      )}
      {modal?.name === ModalNames.updatePermission && (
        <UpdatePermission modal={modal} setModal={setModal} refetch={refetch} />
      )}
      <PageHeader title={adminRole === "master" ? "Staff" : "Checkers"} />

      {/* Client Card */}
      {data?.result?.map((checker, index) => {
        return (
          <div key={index} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Staff Name</span>
              <span className="right">{checker?.staff_name}</span>
            </div>

            <div className="row">
              <span>Username</span>
              <span>{checker?.username}</span>
            </div>

            <div className="row">
              <span>Status</span>
              <span
                className={`${checker?.status == 1 ? "SUCCESS" : "WARNING"}`}
              >
                {" "}
                {checker?.userStatus === 1 ? "active" : "inactive"}
              </span>
            </div>

            <div className="row">
              <span>{adminRole === "master" ? "Permission" : "Role"}</span>
              <span>{checker?.permissions}</span>
            </div>

            <div className="row">
              <span>Reg. Dat</span>
              <span>{checker?.date}</span>
            </div>
            <div className="actions">
              <button
                onClick={() =>
                  handleOpenModal(checker, ModalNames.updateStaffStatus)
                }
                className="btn btn-success"
              >
                S
              </button>
              <button
                onClick={() =>
                  handleOpenModal(checker, ModalNames.staffChangePassword)
                }
                className="btn btn-danger"
              >
                P
              </button>
              <button
                onClick={() =>
                  handleOpenModal(checker, ModalNames.updatePermission)
                }
                className="btn btn-warning"
              >
                R
              </button>
              <button
                onClick={() => handleDelete(checker)}
                className="btn btn-danger"
              >
                D
              </button>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewStaff;
