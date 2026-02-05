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
