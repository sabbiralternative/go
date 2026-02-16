import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDownLineEditFormQuery } from "../../../hooks/downLineEditForm";
import { useBalanceQuery } from "../../../hooks/balance";
import { useDownLineEditMutation } from "../../../hooks/downLineEdit";
import { AdminRole } from "../../../constant/constant";

const DirectWithdraw = ({ modal, setModal, refetchClient }) => {
  const { adminRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [amountTwo, setAmountTwo] = useState(null);
  const [amountOne, setAmountOne] = useState(null);
  const [amount, setAmount] = useState(null);
  const payload = {
    type: "balance",
    downlineId: modal?.downlineId,
    id: modal?.id,
    role: modal?.role,
  };

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = methods;

  const { data } = useDownLineEditFormQuery(payload);
  const { refetch: refetchBalance } = useBalanceQuery();
  const {
    mutate: downlineEdit,
    isPending,
    isSuccess,
  } = useDownLineEditMutation();

  const closeModal = () => {
    dispatch(setModal(null));
  };

  const handleAmount = (e) => {
    const userOne = (data?.amount + parseFloat(e)).toFixed(2);
    setAmountOne(userOne);
    const userTwo = (data?.amount2 - parseFloat(e)).toFixed(2);
    setAmountTwo(userTwo);
  };

  const onSubmit = async (values) => {
    const payload = {
      id: modal?.id,
      downlineId: modal?.downlineId,
      type: "withdraw",
      ...values,
      amount,
      role: modal?.role,
    };
    downlineEdit(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          if (adminRole !== AdminRole.admin_master) {
            refetchBalance();
            refetchClient();
          }
          reset();
          closeModal();
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  useEffect(() => {
    if (data?.result && Object.values(data.result).length > 0) {
      reset({
        amount: data?.result?.amount?.toFixed(2),
      });
    }
  }, [data, reset]);

  return (
    <div className="modal-overlay">
      <ModalWrapper onClose={closeModal}>
        <form
          className="change-password-modal"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <span>Direct Withdraw</span>
            <span onClick={closeModal} className="close-icon">
              ✕
            </span>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            <div style={{ display: "flex", gap: "0px 10px" }}>
              <div style={{ position: "relative" }}>
                <label> Previous Balance</label>
                <input readOnly value={data?.result?.amount?.toFixed(2)} />
              </div>
              <div style={{ position: "relative" }}>
                <label> Balance after withdraw</label>
                <input
                  readOnly
                  value={
                    amountOne !== null && !isNaN(amountOne)
                      ? amountOne
                      : data?.result?.amount?.toFixed(2)
                  }
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "0px 10px" }}>
              <div style={{ position: "relative" }}>
                <label> Previous Balance</label>
                <input readOnly value={data?.result?.amount2?.toFixed(2)} />
              </div>
              <div style={{ position: "relative" }}>
                <label> Balance after withdraw</label>
                <input
                  readOnly
                  value={
                    amountTwo !== null && !isNaN(amountTwo)
                      ? amountTwo
                      : data?.result?.amount2?.toFixed(2)
                  }
                />
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <label>Withdraw Amount</label>
              <input
                type="number"
                onChange={(e) => {
                  handleAmount(e.target.value);
                  setAmount(e.target.value);
                }}
                placeholder="Enter Withdraw Amount"
              />
            </div>
            <div style={{ position: "relative" }}>
              <label> Remark</label>
              <input
                type="text"
                {...register("remark")}
                placeholder="Enter Remark"
              />
            </div>
            <div style={{ position: "relative" }}>
              <label> Transaction Code</label>
              <input
                type="text"
                {...register("mpassword")}
                placeholder="Enter Transaction Code"
              />
            </div>
          </div>
          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              disabled={isPending && !isSuccess}
              type="submit"
              className="save-btn"
            >
              {isSubmitting ? "Loading..." : "Withdraw"}
            </button>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default DirectWithdraw;
