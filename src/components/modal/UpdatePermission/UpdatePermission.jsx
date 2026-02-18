import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import GoForm from "../../shared/form/GoForm";
import { FormProvider, useForm } from "react-hook-form";
import { useStaffMutation, useStaffQuery } from "../../../hooks/staff";
import { AdminRole } from "../../../constant/constant";

const UpdatePermission = ({ modal, setModal, refetch }) => {
  const { adminRole } = useSelector((state) => state.auth);
  const methods = useForm();
  const { handleSubmit, reset, register } = methods;
  const { data } = useStaffQuery({
    type: "viewSingleStaff",
    staff_id: modal?.staff_id,
  });
  const {
    mutate: updateStaffPermission,
    isPending,
    isSuccess,
  } = useStaffMutation();

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal(null));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: "updateStaffRole",
      staff_id: modal?.staff_id,
    };

    updateStaffPermission(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          reset();
          refetch();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  const staffPermission = data?.result?.[0]?.permissions;

  if (!data?.result) {
    return null;
  }

  const permissionsList = [
    {
      label: "Dashboard",
      value: "dashboard",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Deposit",
      value: "deposit",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Withdraw",
      value: "withdraw",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Client",
      value: "client",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Direct Deposit",
      value: "directDeposit",
      show: true,
    },
    {
      label: "Deposit With Slip",
      value: "depositWithSlip",
      show: true,
    },
    {
      label: "Direct Withdraw",
      value: "directWithdraw",
      show: true,
    },
    {
      label: "Payment",
      value: "payment",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Report",
      value: "report",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Settings",
      value: "setting",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Bonus",
      value: "bonus",
      show: adminRole === AdminRole.master,
    },
    {
      label: "Exposure",
      value: "exposure",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },

    {
      label: "Password",
      value: "password",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Branch",
      value: "branch",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Complaint",
      value: "complaint",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Staff",
      value: "staff",
      show:
        adminRole === AdminRole.master || adminRole === AdminRole.hyper_master,
    },
    {
      label: "Affiliate",
      value: "affiliate",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Change Branch",
      value: "change_branch",
      show: adminRole === AdminRole.hyper_master,
    },
  ];

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <FormProvider {...methods}>
          <GoForm onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className="modal-header">
              <span>Change Status</span>
              <span onClick={closeModal} className="close-icon">
                ✕
              </span>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0px 20px",
                }}
              >
                {permissionsList?.map((permission) => {
                  return (
                    <label
                      key={permission.value}
                      style={{
                        display: "flex",
                        width: "fit-content",
                        gap: "5px",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <input
                        style={{ width: "fit-content" }}
                        type="checkbox"
                        {...register("permissions", { required: true })}
                        value={permission.value}
                        defaultChecked={staffPermission?.includes(
                          permission.value,
                        )}
                      />
                      <span> {permission?.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                disabled={isPending && !isSuccess}
                type="submit"
                className="save-btn"
              >
                {isPending && !isSuccess ? "Loading..." : "Save changes"}
              </button>
            </div>
          </GoForm>
        </FormProvider>
      </ModalWrapper>
    </div>
  );
};

export default UpdatePermission;
