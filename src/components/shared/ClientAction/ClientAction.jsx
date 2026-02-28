import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AdminRole, ModalNames, Permission } from "../../../constant/constant";
import ClientDeposit from "../../modal/ClientDeposit/ClientDeposit";
import DirectWithdraw from "../../modal/DirectWithdraw/DirectWithdraw";
import { useNavigate } from "react-router-dom";
import { usePermission } from "../../../hooks/use-permission";
import DirectDeposit from "../../modal/DirectDeposit/DirectDeposit";
import ChangeBranch from "../../modal/ChangeBranch/ChangeBranch";
import { FaEllipsisVertical } from "react-icons/fa6";
import ModalWrapper from "../../modal/ModalWrapper/ModalWrapper";
import ChangeStatus from "../../modal/ChangeStatus/ChangeStatus";
import ChangePassword from "../../modal/ChangePassword/ChangePassword";
import CreditReference from "../../modal/CreditReference/CreditReference";
import ChangeColor from "../../modal/ChangeColor/ChangeColor";

const ClientAction = ({ refetchClient, client, index }) => {
  const showMoreRef = useRef();
  const { permissions } = usePermission();
  const [showMore, setShowMore] = useState(null);
  const navigate = useNavigate();
  const { adminRole } = useSelector((state) => state.auth);
  const [modal, setModal] = useState({
    name: "",
    username: "",
    role: "",
    downlineId: "",
  });

  const handleOpenModal = (client, name) => {
    setModal({
      name,
      downlineId: client?.username,
      role: client?.role,
      id: client?.downlineId,
    });
    setShowMore(null);
  };

  const handleNavigate = (client) => {
    const formatUserId = client?.userId?.split("-")[1];
    navigate(
      `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`,
    );
  };
  const handleShowMore = (i) => {
    if (i === showMore) {
      setShowMore(null);
    } else {
      setShowMore(i);
    }
  };
  return (
    <Fragment>
      {modal?.name === ModalNames.clientDeposit && (
        <ClientDeposit modal={modal} setModal={setModal} />
      )}
      {modal?.name === ModalNames.directWithdraw && (
        <DirectWithdraw
          modal={modal}
          setModal={setModal}
          refetchClient={refetchClient}
        />
      )}
      {modal?.name === ModalNames.directDeposit && (
        <DirectDeposit
          modal={modal}
          setModal={setModal}
          refetchClient={refetchClient}
        />
      )}
      {modal?.name === ModalNames.changeBranch && (
        <ChangeBranch
          modal={modal}
          setModal={setModal}
          refetchClient={refetchClient}
        />
      )}
      {modal?.name === ModalNames.changeStatus && (
        <ChangeStatus
          modal={modal}
          setModal={setModal}
          refetch={refetchClient}
        />
      )}
      {modal?.name === ModalNames.changePassword && (
        <ChangePassword
          modal={modal}
          setModal={setModal}
          refetch={refetchClient}
        />
      )}
      {modal?.name === ModalNames.creditReference && (
        <CreditReference
          modal={modal}
          setModal={setModal}
          refetch={refetchClient}
        />
      )}
      {modal?.name === ModalNames.changeColor && (
        <ChangeColor
          modal={modal}
          setModal={setModal}
          refetchClient={refetchClient}
        />
      )}

      <div className="actions">
        {adminRole !== AdminRole.hyper_master &&
          adminRole !== AdminRole.branch_staff &&
          adminRole !== AdminRole.admin_staff && (
            <Fragment>
              <button
                className="btn btn-success"
                onClick={() =>
                  handleOpenModal(client, ModalNames.clientDeposit)
                }
              >
                D
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleOpenModal(client, ModalNames.directWithdraw)
                }
              >
                W
              </button>
            </Fragment>
          )}
        {adminRole !== AdminRole.branch_staff && (
          <button
            className="btn btn-danger"
            onClick={() => handleNavigate(client)}
          >
            PL
          </button>
        )}
        {permissions.includes(Permission.client) &&
          adminRole !== AdminRole.master &&
          adminRole !== AdminRole.hyper_master && (
            <Fragment>
              {permissions.includes(Permission.deposit) && (
                <Fragment>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleOpenModal(client, ModalNames.directDeposit)
                    }
                  >
                    DD
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleOpenModal(client, ModalNames.clientDeposit)
                    }
                  >
                    D
                  </button>
                </Fragment>
              )}
              {permissions.includes(Permission.withdraw) && (
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleOpenModal(client, ModalNames.directWithdraw)
                  }
                >
                  W
                </button>
              )}
            </Fragment>
          )}

        {(adminRole == AdminRole.hyper_master ||
          adminRole === AdminRole.admin_staff) && (
          <Fragment>
            <button
              className="btn btn-info"
              onClick={() =>
                navigate(`/change-branch-report/${client?.userId}`)
              }
            >
              B
            </button>
            {((adminRole === AdminRole.admin_staff &&
              permissions?.includes(Permission.change_branch)) ||
              adminRole == AdminRole.hyper_master) && (
              <button
                className="btn btn-danger"
                onClick={() => handleOpenModal(client, ModalNames.changeBranch)}
              >
                M
              </button>
            )}
          </Fragment>
        )}

        {adminRole !== AdminRole.hyper_master &&
          adminRole !== AdminRole.branch_staff &&
          adminRole !== AdminRole.admin_staff && (
            <button
              className="btn btn-danger"
              onClick={() => handleOpenModal(client, ModalNames.directDeposit)}
            >
              DD
            </button>
          )}

        {(adminRole === AdminRole.master ||
          adminRole === AdminRole.branch_staff) && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => handleShowMore(index)}
              type="button"
              className="btn btn-primary btn-icon"
            >
              <FaEllipsisVertical />
            </button>

            {index === showMore && (
              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  zIndex: 999,
                }}
              />
            )}
            {index === showMore && (
              <ModalWrapper onClose={() => setShowMore(false)}>
                <ul
                  ref={showMoreRef}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    position: "absolute",
                    right: "0px",
                    top: "40px",
                    zIndex: 9999,
                    width: "100px",
                    background: "#1e1e1e",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                  className="dropdown-menu dropdown-menu-end"
                >
                  {permissions.includes("depositWithSlip") && (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleOpenModal(client, ModalNames.directDeposit)
                      }
                    >
                      Deposit With Slip
                    </button>
                  )}
                  {permissions?.includes("directWithdraw") && (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleOpenModal(client, ModalNames.directWithdraw)
                      }
                    >
                      Withdraw
                    </button>
                  )}
                  {permissions?.includes("directDeposit") && (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleOpenModal(client, ModalNames.directDeposit)
                      }
                    >
                      Direct Deposit
                    </button>
                  )}

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      navigate(
                        `/activity-logs?role=${client?.role}&id=${client?.userId}`,
                      )
                    }
                  >
                    Activity Logs
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleOpenModal(client, ModalNames.changeColor)
                    }
                  >
                    Client Group
                  </button>

                  {permissions.includes("client") &&
                    adminRole !== "admin_staff" && (
                      <Fragment>
                        {permissions.includes("password") && (
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleOpenModal(client, ModalNames.changePassword)
                            }
                          >
                            Change Password
                          </button>
                        )}

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleOpenModal(client, ModalNames.changeStatus)
                          }
                        >
                          Change Status
                        </button>
                      </Fragment>
                    )}
                  {adminRole !== AdminRole.hyper_master &&
                    adminRole !== AdminRole.branch_staff &&
                    adminRole !== AdminRole.admin_staff &&
                    adminRole !== AdminRole.master && (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleOpenModal(client, ModalNames.creditReference)
                        }
                      >
                        Credit Reference
                      </button>
                    )}
                </ul>
              </ModalWrapper>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ClientAction;
