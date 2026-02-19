import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ViewClients from "../pages/Clients/ViewClients";
import ClientsWithBalance from "../pages/Clients/ClientsWithBalance";
import AllClients from "../pages/Clients/AllClients";
import InActiveClients from "../pages/Clients/InActiveClients";
import SuspendedClients from "../pages/Clients/SuspendedClients";
import NonTrustedClients from "../pages/Clients/NonTrustedClients";
import TrustedClients from "../pages/Clients/TrustedClients";
import VIPClients from "../pages/Clients/VIPClients";
import VVIPClients from "../pages/Clients/VVIPClients";
import PremiumClients from "../pages/Clients/PremiumClients";
import ActiveClients from "../pages/Clients/ActiveClients";
import ViewBranches from "../pages/Branches/ViewBranches";
import ViewSuperBranches from "../pages/Branches/ViewSuperBranches";
import PendingDeposit from "../pages/Deposit/PendingDeposit";
import CompletedDeposit from "../pages/Deposit/CompletedDeposit";
import RejectedDeposit from "../pages/Deposit/RejectedDeposit";
import UTRSearch from "../pages/Deposit/UTRSearch";
import PendingWithdraw from "../pages/Withdraw/PendingWithdraw";
import CompletedWithdraw from "../pages/Withdraw/CompletedWithdraw";
import RejectedWithdraw from "../pages/Withdraw/RejectedWithdraw";
import ViewPaymentMethods from "../pages/Payments/ViewPaymentMethods";
import CurrentBets from "../pages/Exposure/CurrentBets";
import ViewStaff from "../pages/Staff/ViewStaff";
import ViewAffiliate from "../pages/Affiliate/ViewAffiliate";
import ViewAffiliateClient from "../pages/Affiliate/ViewAffiliateClient";
import ViewAffiliateDeposit from "../pages/Affiliate/ViewAffiliateDeposit";
import ViewAffiliateWithdraw from "../pages/Affiliate/ViewAffiliateWithdraw";
import ViewBanner from "../pages/Settings/ViewBanner";
import ViewNotification from "../pages/Settings/ViewNotification";
import PendingComplaints from "../pages/Complaints/PendingComplaints";
import ResolvedComplaints from "../pages/Complaints/ResolvedComplaints";
import ViewBonus from "../pages/Bonus/ViewBonus";
import ViewLossBackBonus from "../pages/Bonus/ViewLossBackBonus";
import LossBackBonusReport from "../pages/Bonus/LossBackBonusReport";
import PendingBonus from "../pages/Bonus/PendingBonus";
import RejectedBonus from "../pages/Bonus/RejectedBonus";
import CompletedBonus from "../pages/Bonus/CompletedBonus";
import ClientReport from "../pages/Report/ClientReport";
import DepositReport from "../pages/Report/DepositReport";
import FirstDepositReport from "../pages/Report/FirstDepositReport";
import LastDepositReport from "../pages/Report/LastDepositReport";
import NoDepositReport from "../pages/Report/NoDepositReport";
import WithdrawReport from "../pages/Report/WithdrawReport";
import DirectDepositReport from "../pages/Report/DirectDepositReport";
import DirectWithdrawReport from "../pages/Report/DirectWithdrawReport";
import TransferStatement from "../pages/Report/TransferStatement";
import ClientBranchChangeReport from "../pages/Report/ClientBranchChangeReport";
import AddClient from "../pages/Clients/AddClient";
import PNL from "../pages/PNL/PNL";
import ActivityLogs from "../pages/ActivityLogs/ActivityLogs";
import AddBanner from "../pages/Settings/AddBanner";
import AddLoginBanner from "../pages/Settings/AddLoginBanner";
import AddNotification from "../pages/Settings/AddNotification";
import AddBonus from "../pages/Bonus/AddBonus";
import AddLossBackBonusByEvent from "../pages/Bonus/AddLossBackBonusByEvent";
import AddLossBackBonusByDate from "../pages/Bonus/AddLossBackBonusByDate";
import MarketAnalysis from "../pages/Exposure/MarketAnalysis";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/view-clients",
          element: <ViewClients />,
        },

        {
          path: "/add-client",
          element: <AddClient />,
        },
        {
          path: "/clients-with-balance",
          element: <ClientsWithBalance />,
        },
        {
          path: "/all-clients",
          element: <AllClients />,
        },
        {
          path: "/active-clients",
          element: <ActiveClients />,
        },
        {
          path: "/inactive-clients",
          element: <InActiveClients />,
        },
        {
          path: "/suspended-clients",
          element: <SuspendedClients />,
        },
        {
          path: "/non-trusted-clients",
          element: <NonTrustedClients />,
        },
        {
          path: "/trusted-clients",
          element: <TrustedClients />,
        },
        {
          path: "/vip-clients",
          element: <VIPClients />,
        },
        {
          path: "/vvip-clients",
          element: <VVIPClients />,
        },
        {
          path: "/premium-clients",
          element: <PremiumClients />,
        },
        {
          path: "/view-branch",
          element: <ViewBranches />,
        },
        {
          path: "/view-super-branch",
          element: <ViewSuperBranches />,
        },
        {
          path: "/pending-deposit",
          element: <PendingDeposit />,
        },
        {
          path: "/completed-deposit",
          element: <CompletedDeposit />,
        },
        {
          path: "/rejected-deposit",
          element: <RejectedDeposit />,
        },
        {
          path: "/utr-search",
          element: <UTRSearch />,
        },
        {
          path: "/pending-withdraw",
          element: <PendingWithdraw />,
        },
        {
          path: "/completed-withdraw",
          element: <CompletedWithdraw />,
        },
        {
          path: "/rejected-withdraw",
          element: <RejectedWithdraw />,
        },
        {
          path: "/view-payment-method",
          element: <ViewPaymentMethods />,
        },
        {
          path: "/current-bets",
          element: <CurrentBets />,
        },
        {
          path: "/view-staff",
          element: <ViewStaff />,
        },
        {
          path: "/view-affiliate",
          element: <ViewAffiliate />,
        },
        {
          path: "/view-affiliate-client",
          element: <ViewAffiliateClient />,
        },
        {
          path: "/view-affiliate-deposit",
          element: <ViewAffiliateDeposit />,
        },
        {
          path: "/view-affiliate-withdraw",
          element: <ViewAffiliateWithdraw />,
        },
        {
          path: "/view-banner",
          element: <ViewBanner />,
        },
        {
          path: "/view-notification",
          element: <ViewNotification />,
        },
        {
          path: "/pending-complaints",
          element: <PendingComplaints />,
        },
        {
          path: "/resolved-complaints",
          element: <ResolvedComplaints />,
        },
        {
          path: "/view-bonus",
          element: <ViewBonus />,
        },
        {
          path: "/view-lossback-bonus",
          element: <ViewLossBackBonus />,
        },
        {
          path: "/lossback-bonus-report",
          element: <LossBackBonusReport />,
        },
        {
          path: "/pending-bonus",
          element: <PendingBonus />,
        },
        {
          path: "/rejected-bonus",
          element: <RejectedBonus />,
        },
        {
          path: "/completed-bonus",
          element: <CompletedBonus />,
        },
        {
          path: "/client-report",
          element: <ClientReport />,
        },
        {
          path: "/deposit-report",
          element: <DepositReport />,
        },
        {
          path: "/1st-deposit-report",
          element: <FirstDepositReport />,
        },
        {
          path: "/last-deposit-report",
          element: <LastDepositReport />,
        },
        {
          path: "/no-deposit-report",
          element: <NoDepositReport />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/direct-deposit-report",
          element: <DirectDepositReport />,
        },
        {
          path: "/direct-withdraw-report",
          element: <DirectWithdrawReport />,
        },
        {
          path: "/transfer-statement",
          element: <TransferStatement />,
        },
        {
          path: "/client-branch-change-report",
          element: <ClientBranchChangeReport />,
        },
        {
          path: "/pnl",
          element: <PNL />,
        },
        {
          path: "/activity-logs",
          element: <ActivityLogs />,
        },
        {
          path: "/add-banner",
          element: <AddBanner />,
        },
        {
          path: "/add-login-banner",
          element: <AddLoginBanner />,
        },
        {
          path: "/add-notification",
          element: <AddNotification />,
        },
        {
          path: "/add-bonus",
          element: <AddBonus />,
        },
        {
          path: "/add-loss-back-bonus-by-event",
          element: <AddLossBackBonusByEvent />,
        },
        {
          path: "/add-loss-back-bonus-by-date",
          element: <AddLossBackBonusByDate />,
        },
        {
          path: "/market-analysis",
          element: <MarketAnalysis />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],

  {
    basename: import.meta.env.BASE_URL ?? "/",
  },
);
