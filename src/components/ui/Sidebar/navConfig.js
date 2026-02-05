import { AdminRole } from "../../../constant/constant";

/**
 * Generate navigation items based on permissions and admin role
 * @param {Array} permissions - User permissions array
 * @param {string} adminRole - Current admin role
 * @param {Object} setters - Object containing all setState functions
 * @returns {Array} Navigation items configuration
 */
export const getNavItems = (permissions, adminRole, setters) => {
  const {
    setShowSocialLink,
    setShowAddStaff,
    setAddWhiteLabel,
    setShowAddSuperBranch,
    setShowAddBranch,
    setShowAddBranchStaff,
    setShowDWLimit,
  } = setters;

  return [
    {
      label: "Dashboard",
      href: "/",
      show: permissions.includes("dashboard"),
    },
    {
      tab: "Branch",
      key: "branch",
      show: permissions.includes("branch"),
      children: [
        {
          label: "View Branch",
          href: "/view-branch",
          show: true,
        },
        {
          label: "Add Branch",
          setState: setShowAddBranch,
          show: true,
        },
        {
          label: "View Super Branch",
          href: "/view-super-branch",
          show: true,
        },
        {
          label: "Add Super Branch",
          setState: setShowAddSuperBranch,
          show: true,
        },
      ],
    },
    {
      tab: "Clients",
      key: "client",
      show: permissions.includes("client"),
      children: [
        {
          label: "View Clients",
          href: "/view-client",
          show: true,
        },
        {
          label: "Add Client",
          href: "/add-client",
          show:
            adminRole === AdminRole.master ||
            adminRole === AdminRole.branch_staff,
        },
        {
          label: "Clients With Balance",
          href: "/clients-with-balance",
          show: true,
        },
        {
          label: "All Client",
          href: "/all-client",
          show: true,
        },
        {
          label: "Active Client",
          href: "/active-client",
          show: true,
        },
        {
          label: "Inactive Client",
          href: "/inactive-client",
          show: true,
        },
        {
          label: "Suspended Client",
          href: "/suspended-client",
          show: true,
        },
      ],
    },
    {
      tab: "Deposit",
      key: "deposit",
      show: permissions.includes("deposit"),
      children: [
        {
          label: "Pending Deposit",
          href: "/pending-deposit",
          show: true,
        },
        {
          label: "Completed Deposit",
          href: "/completed-deposit",
          show: true,
        },
        {
          label: "Rejected Deposit",
          href: "/rejected-deposit",
          show: true,
        },
        {
          label: "UTR Search",
          href: "/utr-search",
          show: true,
        },
      ],
    },
    {
      tab: "Withdraw",
      key: "withdraw",
      show: permissions.includes("withdraw"),
      children: [
        {
          label: "Pending Withdraw",
          href: "/pending-withdraw",
          show: true,
        },
        {
          label: "Completed Withdraw",
          href: "/completed-withdraw",
          show: true,
        },
        {
          label: "Rejected Withdraw",
          href: "/rejected-withdraw",
          show: true,
        },
      ],
    },
    {
      tab: "Miscellaneous",
      key: "miscellaneous",
      show:
        permissions?.includes("payment") ||
        permissions?.includes("exposure") ||
        permissions?.includes("affiliate") ||
        permissions?.includes("setting") ||
        permissions?.includes("complaint"),
      willSubTab: true,
      children: [
        {
          tab: "Payments",
          key: "payment",
          show: permissions.includes("payment"),
          children: [
            {
              label: "View Payment Method",
              href: "/view-payment-method",
              show: true,
            },
            {
              label: "Add Bank Account",
              href: "/add-bank-account",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add QR",
              href: "/add-QR",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add UPI",
              href: "/add-UPI",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add Whatsapp Deposit",
              href: "/add-whatsapp-deposit",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add USDT (TRC20)",
              href: "/add-USDT-TRC20",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add USDT (BEP20)",
              href: "/add-USDT-BEP20",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add UPI Payment Gateway",
              href: "/add-payment-gateway",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add TOIT Payment Gateway",
              href: "/add-toit-payment-gateway",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
            {
              label: "Add i100 Payment Gateway",
              href: "/add-i100-payment-gateway",
              show:
                adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.admin_staff,
            },
          ],
        },
        {
          tab: "Exposure",
          key: "exposure",
          show: permissions.includes("exposure"),
          children: [
            {
              label: "Market Analysis",
              href: "/market-analysis",
              show: true,
            },
            {
              label: "Current Bets",
              href: "/current-bets",
              show: true,
            },
          ],
        },
        {
          tab: "Affiliate",
          key: "affiliate",
          show: permissions.includes("affiliate"),
          children: [
            {
              label: "View Affiliate",
              href: "/view-affiliate",
              show: true,
            },
          ],
        },
        {
          tab: "Settings",
          key: "setting",
          show: permissions.includes("setting"),
          children: [
            {
              label: "View Banners",
              href: "/view-banner",
              show: true,
            },
            {
              label: "Add Banner",
              href: "/add-banner",
              show: true,
            },
            {
              label: "Add Login Banner",
              href: "/add-login-banner",
              show: true,
            },
            {
              label: "Social Links",
              setState: setShowSocialLink,
              show: true,
            },
            {
              label: "Update D/W Limit",
              setState: setShowDWLimit,
              show: true,
            },
            {
              label: "View Notifications",
              href: "/view-notification",
              show: true,
            },
            {
              label: "Add Notifications",
              href: "/add-notification",
              show: true,
            },
            // {
            //   label: "View Bonus",
            //   href: "/view-bonus",
            //   show: permissions.includes("bonus"),
            // },
            // {
            //   label: "Add Bonus",
            //   href: "/add-bonus",
            //   show: permissions.includes("bonus"),
            // },
            // {
            //   label: "Pending Bonus",
            //   href: "/pending-bonus",
            //   show: permissions.includes("bonus"),
            // },
            // {
            //   label: "Completed Bonus",
            //   href: "/completed-bonus",
            //   show: permissions.includes("bonus"),
            // },
            // {
            //   label: "Rejected Bonus",
            //   href: "/rejected-bonus",
            //   show: permissions.includes("bonus"),
            // },
          ],
        },
        {
          tab: "Complaints",
          key: "complaint",
          show: permissions?.includes("complaint"),
          children: [
            {
              label: "Pending Complaints",
              href: "/pending-complaints",
              show: true,
            },
            {
              label: "Resolved Complaints",
              href: "/resolved-complaints",
              show: true,
            },
          ],
        },
      ],
    },

    {
      tab: "Bonus",
      key: "bonus",
      show: permissions.includes("bonus"),
      children: [
        {
          label: "View Bonus",
          href: "/view-bonus",
          show:
            adminRole === AdminRole.hyper_master ||
            adminRole === AdminRole.admin_staff,
        },
        {
          label: "Add Bonus",
          href: "/add-bonus",
          show:
            adminRole === AdminRole.hyper_master ||
            adminRole === AdminRole.admin_staff,
        },
        {
          label: "Lossback",
          key: "lossback",
          willSubTab: true,
          show: adminRole === AdminRole.master,
          children: [
            {
              label: "Add Lossback Bonus by Event",
              href: "/add-loss-back-bonus-by-event",
              show: adminRole === AdminRole.master,
            },
            {
              label: "Add Lossback Bonus by Date",
              href: "/add-loss-back-bonus-by-date",
              show: adminRole === AdminRole.hyper_master,
            },
            {
              label: "View Lossback Bonus",
              href: "/view-lossback-bonus",
              show: adminRole === AdminRole.hyper_master,
            },
            {
              label: "Lossback Bonus Report",
              href: "/lossback-bonus-report",
              show: adminRole === AdminRole.hyper_master,
            },
          ],
        },

        {
          label: "Pending Bonus",
          href: "/pending-bonus",
          show: true,
        },
        {
          label: "Completed Bonus",
          href: "/completed-bonus",
          show: true,
        },
        {
          label: "Rejected Bonus",
          href: "/rejected-bonus",
          show: true,
        },
      ],
    },

    {
      tab: "Report",
      key: "report",
      show: permissions.includes("report"),
      children: [
        {
          label: "Client Report",
          href: "/client-report",
          show: true,
        },
        {
          label: "Deposit Report",
          href: "/deposit-report",
          show: true,
        },
        {
          label: "1st Deposit Report",
          href: "/1st-deposit-report",
          show: true,
        },
        {
          label: "Last Deposit Report",
          href: "/last-deposit-report",
          show: true,
        },
        {
          label: "No Deposit Report",
          href: "/no-deposit-report",
          show: true,
        },
        // {
        //   label: "No deposit last 15 days",
        //   href: "/no-deposit-report-last-15-days",
        //   show: true,
        // },
        {
          label: "Withdraw Report",
          href: "/withdraw-report",
          show: true,
        },
        {
          label: "Direct Deposit Report",
          href: "/direct-deposit-report",
          show: true,
        },
        {
          label: "Direct Withdraw Report",
          href: "/direct-withdraw-report",
          show: true,
        },
        {
          label: "Transfer Statement",
          href: "/transfer-statement",
          show: true,
        },
        {
          label: "Client Branch Change Report",
          href: "/client-branch-change-report",
          show: true,
        },
        {
          label: "Lossback Bonus Report",
          href: "/lossback-bonus-report",
          show: true,
        },
      ],
    },
    {
      tab: "Staff",
      key: "staff",
      show: permissions.includes("staff"),
      children: [
        {
          label: "View Staff",
          href: "/view-staff",
          show: true,
        },
        {
          label:
            adminRole === AdminRole.hyper_master
              ? "Add Admin Staff"
              : "Add Staff",
          setState: setShowAddStaff,
          show: true,
        },
        {
          label: "Add Branch Staff",
          setState: setShowAddBranchStaff,
          show: adminRole === AdminRole.hyper_master,
        },
      ],
    },
    {
      tab: "Whitelable",
      key: "whitelable",
      show: permissions.includes("whitelable"),
      children: [
        {
          label: "View Whitelable",
          href: "/view-whitelable",
          show: true,
        },
        {
          label: "Add Whitelable",
          setState: setAddWhiteLabel,
          show: true,
        },
      ],
    },
  ];
};
