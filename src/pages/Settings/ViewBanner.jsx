import { Fragment, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useBannerMutation, useBannerQuery } from "../../hooks/banner";
import { ModalNames } from "../../constant/constant";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditBanner from "../../components/modal/EditBanner/EditBanner";

const ViewBanner = () => {
  const [modal, setModal] = useState({
    name: "",
    banner_id: "",
  });
  const { data, refetch } = useBannerQuery({
    type: "getBanners",
  });

  const { mutate: deleteBanner } = useBannerMutation();

  const handleOpenModal = (deposit, name) => {
    setModal({
      name,
      banner_id: deposit?.banner_id,
    });
  };

  const handleDeleteBanner = async (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          type: "deleteBanner",
          bannerId: banner?.banner_id,
        };
        deleteBanner(payload, {
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
      {/* Header */}
      {modal?.name === ModalNames.editBanner && (
        <EditBanner modal={modal} setModal={setModal} refetch={refetch} />
      )}
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

            <div className="actions">
              <button
                onClick={() => handleOpenModal(banner, ModalNames.editBanner)}
                className="btn btn-success"
              >
                E
              </button>
              <button
                onClick={() => handleDeleteBanner(banner)}
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

export default ViewBanner;
