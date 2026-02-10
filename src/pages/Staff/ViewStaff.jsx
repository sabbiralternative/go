import { Fragment } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useSelector } from "react-redux";
import { useStaffQuery } from "../../hooks/staff";

const ViewStaff = () => {
  const { adminRole } = useSelector((state) => state.auth);
  const { data } = useStaffQuery({
    type: "viewStaff",
    role: "admin_staff",
  });

  return (
    <Fragment>
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
          </div>
        );
      })}
    </Fragment>
  );
};

export default ViewStaff;
