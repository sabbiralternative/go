import { Fragment, useRef, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWhiteLabelQuery } from "../../hooks/whiteLabel";
import { ModalNames } from "../../constant/constant";
import { FaEllipsisVertical } from "react-icons/fa6";
import ModalWrapper from "../../components/modal/ModalWrapper/ModalWrapper";
import DirectWithdraw from "../../components/modal/DirectWithdraw/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword/ChangePassword";
import CreditReference from "../../components/modal/CreditReference/CreditReference";
import AddLogo from "../../components/modal/WhiteLabel/AddLogo/AddLogo";
import AddTheme from "../../components/modal/WhiteLabel/AddTheme/AddTheme";
import AddFavicon from "../../components/modal/WhiteLabel/AddFavicon/AddFavicon";
import ClientDeposit from "../../components/modal/ClientDeposit/ClientDeposit";
import { useNavigate } from "react-router-dom";

const ViewWhiteLabel = () => {
  const navigate = useNavigate();
  const showMoreRef = useRef();
  const [showMore, setShowMore] = useState(null);
  const [modal, setModal] = useState({
    name: "",
    username: "",
    role: "",
    downlineId: "",
  });

  const { data, refetch, isSuccess } = useWhiteLabelQuery({
    type: "viewWhitelabel",
  });

  const handleShowMore = (i) => {
    if (i === showMore) {
      setShowMore(null);
    } else {
      setShowMore(i);
    }
  };

  const handleOpenModal = (client, name) => {
    setModal({
      name,
      downlineId: client?.username,
      role: client?.role,
      id: client?.downlineId,
    });
    setShowMore(null);
  };

  return (
    <Fragment>
      {modal?.name === ModalNames.changePassword && (
        <ChangePassword modal={modal} setModal={setModal} refetch={refetch} />
      )}
      {modal?.name === ModalNames.deposit && (
        <ClientDeposit modal={modal} setModal={setModal} />
      )}
      {modal?.name === ModalNames.directWithdraw && (
        <DirectWithdraw modal={modal} setModal={setModal} />
      )}

      {modal?.name === ModalNames.creditReference && (
        <CreditReference modal={modal} setModal={setModal} refetch={refetch} />
      )}

      {modal?.name === ModalNames.addLogo && (
        <AddLogo modal={modal} refetch={refetch} setModal={setModal} />
      )}
      {modal?.name === ModalNames.addTheme && (
        <AddTheme modal={modal} refetch={refetch} setModal={setModal} />
      )}
      {modal?.name === ModalNames.addFavicon && (
        <AddFavicon modal={modal} refetch={refetch} setModal={setModal} />
      )}

      {/* Header */}
      <PageHeader title="White Label" />

      {/* Client Card */}
      {data?.result?.map((whiteLabel, index) => {
        return (
          <div key={whiteLabel?.userId} className="client-card">
            <div className="card-top">
              <strong>Key</strong>
              <span className="status">
                <i className="ph ph-lock-key-open" /> Value
              </span>
            </div>
            <div className="row">
              <span>Site Name</span>
              <span className="right">{whiteLabel?.site_name}</span>
            </div>
            <div className="row">
              <span>Site URL</span>
              <span
                onClick={() => window.open(`https://${whiteLabel?.site_url}`)}
              >
                {whiteLabel?.site_url}
              </span>
            </div>

            <div className="row">
              <span>Admin</span>
              <span>{whiteLabel?.admin}</span>
            </div>
            <div className="row">
              <span>Theme</span>
              <span>{whiteLabel?.theme}</span>
            </div>
            <div className="row">
              <span>Assets</span>
              <span>
                <button
                  className="btn btn-icon btn-sm btn-success"
                  onClick={() =>
                    window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/logo.${whiteLabel?.logo_format}
`)
                  }
                >
                  L
                </button>{" "}
                <button
                  className="btn btn-icon btn-sm btn-danger"
                  onClick={() =>
                    window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/theme.css
`)
                  }
                >
                  T
                </button>{" "}
                <button
                  className="btn btn-icon btn-sm btn-info"
                  onClick={() =>
                    window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/favicon.png
`)
                  }
                >
                  F
                </button>
              </span>
            </div>
            <div className="row">
              <span>Deposit Limit</span>
              <span> {whiteLabel?.deposit_limit}</span>
            </div>

            <div className="row">
              <span>Withdraw Limit</span>
              <span>{whiteLabel?.withdraw_limit}</span>
            </div>
            <div className="row">
              <span>Casino Currency</span>
              <span>{whiteLabel?.casino_currency}</span>
            </div>
            <div className="row">
              <span>Currency</span>
              <span>{whiteLabel?.currency}</span>
            </div>
            <div className="actions">
              <button
                className="btn btn-success"
                onClick={() => handleOpenModal(whiteLabel, ModalNames.deposit)}
              >
                D
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleOpenModal(whiteLabel, ModalNames.directWithdraw)
                }
              >
                W
              </button>
              <button
                className="btn btn-warning"
                onClick={() =>
                  handleOpenModal(whiteLabel, ModalNames.changePassword)
                }
              >
                P
              </button>

              <button
                className="btn btn-info"
                onClick={() =>
                  handleOpenModal(whiteLabel, ModalNames.creditReference)
                }
              >
                CR
              </button>

              <button
                className="btn btn-outline"
                onClick={() =>
                  navigate(
                    `/update-whitelabel?whitelabel_id=${whiteLabel?.whitelabel_id}`,
                  )
                }
              >
                E
              </button>

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
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleOpenModal(whiteLabel, ModalNames.addLogo)
                        }
                      >
                        Add Logo
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleOpenModal(whiteLabel, ModalNames.addTheme)
                        }
                      >
                        Add Theme.css
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleOpenModal(whiteLabel, ModalNames.addFavicon)
                        }
                      >
                        Add Favicon
                      </button>
                    </ul>
                  </ModalWrapper>
                )}
              </div>
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

export default ViewWhiteLabel;
