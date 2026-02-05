import { useUser } from "../../../hooks/use-user";
import { useEffect, useRef, useState } from "react";
import { usePermission } from "../../../hooks/use-permission";
import { useBalanceQuery } from "../../../hooks/balance";
import moment from "moment";
import Loader from "../../shared/Loader/Loader";
import useGetDWCountQuery from "../../../hooks/dwCount";
import assets from "../../../assets";

const Summary = () => {
  const [time, setTime] = useState(moment().format("MMM D, YYYY, hh:mm:ss A"));
  const { data: dwCount } = useGetDWCountQuery();
  const [depositCount, setDepositCount] = useState(null);
  const [withdrawCount, setWithdrawCount] = useState(null);
  const depositRefCount = useRef(depositCount);
  const withdrawRefCount = useRef(withdrawCount);
  const [playSound, setPlaySound] = useState(false);
  //   const { adminRole, adminName } = useSelector((state) => state.auth);
  //   const today = new Date();
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const { permissions } = usePermission();
  const {
    data: balanceData,
    isLoading,
    isPending,
  } = useBalanceQuery({
    date: moment(date).format("YYYY-MM-DD"),
    user_id: user?.user_id,
    role: user?.role,
  });

  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "black";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };
  useEffect(() => {
    if (dwCount?.depositCount >= 0 || dwCount?.withdrawCount >= 0) {
      if (
        (playSound &&
          depositCount !== null &&
          depositCount > depositRefCount.current) ||
        (playSound &&
          withdrawCount !== null &&
          withdrawCount > withdrawRefCount.current)
      ) {
        new Audio(assets.notification).play();
      }
      depositRefCount.current = depositCount;
      withdrawRefCount.current = withdrawCount;
      setDepositCount(dwCount?.depositCount);
      setWithdrawCount(dwCount?.withdrawCount);
      setPlaySound(true);
    }
  }, [depositCount, withdrawCount, playSound, dwCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("MMM D, YYYY, hh:mm:ss A"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="summary">
      <p className="date">{time} IST</p>
      <div className="summary-card">
        <div>
          <span>Upper Level</span>
          <strong>
            {" "}
            {isLoading || isPending ? <Loader /> : balanceData?.upperLevel}
          </strong>
        </div>
        <div>
          <span>Total Client Balance</span>
          <strong>
            {" "}
            {isLoading || isPending ? (
              <Loader />
            ) : (
              balanceData?.downLevelOccupyBalance
            )}
          </strong>
        </div>
        <div>
          <span>Available Balance</span>
          <strong>
            {isLoading || isPending ? (
              <Loader />
            ) : (
              balanceData?.availableBalance ||
              (balanceData?.availableBalance == 0 &&
                balanceData?.availableBalance?.toFixed(2))
            )}
          </strong>
        </div>
        <div>
          <span>Total Master Balance</span>
          <strong>
            {isLoading || isPending ? (
              <Loader />
            ) : (
              balanceData?.totalMasterBalance
            )}
          </strong>
        </div>
        <div>
          <span>New Users Today</span>
          <strong>
            {isLoading || isPending ? <Loader /> : balanceData?.usersToday}
          </strong>
        </div>
        <div>
          <span>Total Deposit Today</span>
          <strong>
            {" "}
            {isLoading || isPending ? <Loader /> : balanceData?.depositToday}
          </strong>
        </div>
        <div>
          <span>Total Withdraw Today</span>
          <strong>
            {" "}
            {isLoading || isPending ? <Loader /> : balanceData?.withdrawToday}
          </strong>
        </div>
        <div>
          <span>P/L Today</span>
          <strong
            style={{
              color: `${defineBalanceColor(balanceData?.pnlToday)}`,
            }}
          >
            {" "}
            {isLoading || isPending ? <Loader /> : balanceData?.pnlToday}
          </strong>
        </div>
        <div>
          <span> Pending Dep.</span>
          <strong> {depositCount}</strong>
        </div>
        <div>
          <span> Pending WD.</span>
          <strong> {withdrawCount}</strong>
        </div>
      </div>
    </section>
  );
};

export default Summary;
