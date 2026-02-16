import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { AdminRole, ModalNames } from "../../../constant/constant";
import ClientDeposit from "../../modal/ClientDeposit/ClientDeposit";
import DirectWithdraw from "../../modal/DirectWithdraw/DirectWithdraw";

const ClientAction = ({ refetchClient, client }) => {
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

      <div
        className="actions"
        style={{
          display: adminRole === AdminRole.admin_staff ? "none" : "flex",
        }}
      >
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
      </div>
    </Fragment>
  );
};

export default ClientAction;
