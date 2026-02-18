import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useSelector } from "react-redux";
import { useStaffQuery } from "../../hooks/staff";
import { AdminRole, ModalNames } from "../../constant/constant";
import UpdateStaffStatus from "../../components/modal/UpdateStaffStatus/UpdateStaffStatus";
import StaffChangePassword from "../../components/modal/StaffChangePassword/StaffChangePassword";
import UpdatePermission from "../../components/modal/UpdatePermission/UpdatePermission";

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
            <div
              className="actions"
              style={{
                display: adminRole === AdminRole.master ? "flex" : "none",
              }}
            >
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
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewStaff;
